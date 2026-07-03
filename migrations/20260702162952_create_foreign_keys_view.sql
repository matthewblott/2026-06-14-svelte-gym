-- +goose Up

pragma foreign_keys = off;
pragma legacy_alter_table = on;

create view foreign_keys_view as
select
  m.name as table_name,
  fk.id as foreign_key_id,
  fk.seq,
  fk."table" as referenced_table,
  fk."from" as from_column,
  fk."to" as referenced_column,
  fk.on_update,
  fk.on_delete,
  fk.match
from sqlite_schema as m
join pragma_foreign_key_list(m.name) as fk
where m.type = 'table';

-- +goose Down

drop view foreign_keys_view;

pragma foreign_keys = on;
pragma legacy_alter_table = off;
