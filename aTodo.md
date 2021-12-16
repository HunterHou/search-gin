扫描与更新索引分开
计算是否更新索引 减少全量更新索引，
索引批量更新问题

=== RUN   TestUpdateIndex
total:34327
update:false
2021-12-16 11:23:50.0003352 +0800 CST m=+6.117231701 开始执行:3    4327
2021-12-16 11:24:31.9864358 +0800 CST m=+48.103382601 结束执行:    41986100600
--- PASS: TestUpdateIndex (48.07s)


=== RUN   TestBatchUpdateIndex
total:34327
update:false
2021-12-16 11:25:40.0136449 +0800 CST m=+6.426261401 开始   执行:34327
2021-12-16 11:26:53.290677 +0800 CST m=+79.703381401 结束执   行:73277032100
--- PASS: TestBatchUpdateIndex (79.64s)


=== RUN   TestUpdateIndex
total:34327
update:false
2021-12-16 11:32:38.0891145 +0800 CST m=+5.742456201 开始执行:3    4327
2021-12-16 11:33:22.867454 +0800 CST m=+50.520845001 结束执行:4    4778339500
--- PASS: TestUpdateIndex (50.49s)


=== RUN   TestBatchUpdateIndex
total:34327
update:false
2021-12-16 11:28:55.224689 +0800 CST m=+5.813827601 开始执    行:34327
2021-12-16 11:30:01.0863446 +0800 CST m=+71.675562301 结束  执行:65861655600
--- PASS: TestBatchUpdateIndex (71.64s)