create table if not exists public.site_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.site_admins enable row level security;
grant select on public.site_admins to authenticated;
create policy admin_own_membership on public.site_admins for select to authenticated using ((select auth.uid()) = user_id);
create table if not exists public.site_settings (
 id smallint primary key check(id=1),
 whatsapp text not null check(whatsapp ~ '^[0-9]{10,15}$'),
 email text not null check(length(email) between 3 and 254),
 instagram text not null default '' check(instagram='' or instagram ~ '^https://(www\.)?instagram\.com/[^/]+'),
 updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
grant select on public.site_settings to anon,authenticated;
grant update on public.site_settings to authenticated;
create policy settings_read on public.site_settings for select to anon,authenticated using (true);
create policy settings_admin_update on public.site_settings for update to authenticated using(exists(select 1 from public.site_admins where user_id=(select auth.uid()))) with check(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
insert into public.site_settings(id,whatsapp,email,instagram) values(1,'5511983600255','Freitas.WebDev@gmail.com','') on conflict(id) do nothing;
create table if not exists public.leads (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check(length(name) between 2 and 100),
 company text not null default '' check(length(company)<=140),
 email text not null check(length(email)<=254),
 phone text not null check(length(phone) between 8 and 30),
 type text not null check(length(type) between 2 and 80),
 budget text not null default 'A definir' check(length(budget)<=80),
 deadline text not null default 'A definir' check(length(deadline)<=80),
 message text not null check(length(message) between 20 and 5000),
 consent boolean not null check(consent=true),
 status text not null default 'novo' check(status in ('novo','em_contato','concluido'))
);
alter table public.leads enable row level security;
revoke all on public.leads from anon;
grant select,update,delete on public.leads to authenticated;
create policy leads_admin_read on public.leads for select to authenticated using(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create policy leads_admin_update on public.leads for update to authenticated using(exists(select 1 from public.site_admins where user_id=(select auth.uid()))) with check(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create policy leads_admin_delete on public.leads for delete to authenticated using(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create index leads_created_at_idx on public.leads(created_at desc);
create table if not exists public.submission_limits(key text primary key,window_start timestamptz not null default now(),count integer not null default 1);
alter table public.submission_limits enable row level security;
revoke all on public.submission_limits from anon,authenticated;
-- Invoker function is callable only by the trusted Edge Function service role.
create or replace function public.accept_lead(payload jsonb, rate_key text) returns uuid language plpgsql security invoker set search_path='' as $$
declare new_id uuid; current_count integer;
begin
 delete from public.submission_limits where window_start < now()-interval '1 day';
 insert into public.submission_limits(key) values(rate_key) on conflict(key) do update set count=case when public.submission_limits.window_start < now()-interval '1 hour' then 1 else public.submission_limits.count+1 end,window_start=case when public.submission_limits.window_start < now()-interval '1 hour' then now() else public.submission_limits.window_start end returning count into current_count;
 if current_count>5 then raise exception 'RATE_LIMIT'; end if;
 insert into public.leads(name,company,email,phone,type,budget,deadline,message,consent) values(payload->>'name',coalesce(payload->>'company',''),payload->>'email',payload->>'phone',payload->>'type',coalesce(payload->>'budget','A definir'),coalesce(payload->>'deadline','A definir'),payload->>'message',(payload->>'consent')::boolean) returning id into new_id;
 return new_id;
end;$$;
revoke all on function public.accept_lead(jsonb,text) from public,anon,authenticated;
grant execute on function public.accept_lead(jsonb,text) to service_role;
-- Reserved extensibility: a protected JSON document store for future CMS modules.
create table if not exists public.content_documents(id text primary key,kind text not null check(kind in ('project','service','testimonial','copy','image','seo')),document jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());
alter table public.content_documents enable row level security;
grant select,insert,update,delete on public.content_documents to authenticated;
create policy content_admin on public.content_documents for all to authenticated using(exists(select 1 from public.site_admins where user_id=(select auth.uid()))) with check(exists(select 1 from public.site_admins where user_id=(select auth.uid())));
create policy rate_limit_no_client_access on public.submission_limits for all to anon, authenticated using (false) with check (false);
