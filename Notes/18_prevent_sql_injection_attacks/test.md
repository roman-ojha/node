
/repositories/:userQuery
```sql
SELECT * FROM Repository WHERE TAG = '${userQuery}' AND public = 1
```

# let's say that user request with query like this:
/repositories/javascript
```sql
SELECT * FROM Repository WHERE TAG = 'javascript' AND public = 1
```

# What if user have query parameter like this: javascript';--
# so, -- sql will comment out the sql. So, user injected a bit of sql that close off query and ended of with ';' and commented out the rest of query that suppose to be there, so now user not only have access to public repository but also have access to private repository
/repositories/javascript';--
```sql
SELECT * FROM Repository WHERE TAG = 'javascript';--' AND public = 1
```


# Another Scenario:
/repositories/javascript'; DROP TABLE Repository;--
# Now here we can see the problem where sql injected query try to drop table repository
```sql
SELECT * FROM Repository WHERE TAG = 'javascript'; DROP TABLE Repository;-- AND public = 1
```

/repositories/javascript';--
```sql
SELECT * FROM Repository WHERE TAG = 'javascript'; DROP TABLE Repository;-- AND public = 1
```
