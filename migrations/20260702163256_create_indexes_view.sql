-- +goose Up

pragma foreign_keys = off;
pragma legacy_alter_table = on;

create view indexes_view as
select
  t.name as table_name,
  il.name as index_name,
  il.origin,
  il.partial,
  il."unique",
  ii.seqno,
  ii.cid,
  ii.name as column_name
from sqlite_schema as t
join pragma_index_list(t.name) as il
join pragma_index_info(il.name) as ii
where t.type = 'table'
  and t.name not like 'sqlite_%'
order by
  t.name,
  il.name,
  ii.seqno;

-- +goose Down

drop view indexes_view;

pragma foreign_keys = on;
pragma legacy_alter_table = off;
