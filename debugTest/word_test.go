package debugTest

import (
	"database/sql"
	"fmt"
	"os"
	"search-gin/utils"
	"testing"

	// "github.com/huichen/sego"
	_ "github.com/mattn/go-sqlite3"
)

// func TestWorld(t *testing.T) {
// 	//  载入词典
// 	var segmenter sego.Segmenter
// 	segmenter.LoadDictionary("dictionary.txt")

// 	// 分词
// 	text := []byte("微信图片_20211221095110.jpg")
// 	segments := segmenter.InternalSegment(text, true)

// 	// 处理分词结果
// 	// 支持普通模式和搜索模式两种分词，见代码中SegmentsToString函数的注释。
// 	str := sego.SegmentsToSlice(segments, true)
// 	for i := 0; i < len(str); i++ {
// 		fmt.Println(str[i])
// 	}

// }

func TestId(t *testing.T) {
	Id := "D:\\emby\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}.jpeg"
	id, pId := utils.DirpathForId(Id)
	fmt.Println(id)
	fmt.Println(pId)
}

type Lib struct {
	Key   string
	Value string
}

func (l *Lib) toString() string {
	return fmt.Sprintf(" key: %v,value:%v", l.Key, l.Value)
}

func TestCreateDb(t *testing.T) {
	os.Remove("./test.db")

	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	sqlStmt := `
	create table test (key text, value text);
	delete from test;
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		t.Logf("%q: %s\n", err, sqlStmt)
		return
	}
}

func TestInsert(log *testing.T) {
	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	stmt, err := tx.Prepare("insert into test(key, value) values(?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	for i := 0; i < 100; i++ {
		_, err = stmt.Exec(i, fmt.Sprintf("こんにちわ世界%03d", i))
		if err != nil {
			log.Fatal(err)
		}
	}
	tx.Commit()
}

func TestQuery(log *testing.T) {
	db, err := sql.Open("sqlite3", "./test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	rows, err := db.Query("select key, value from test")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		test := Lib{}
		err = rows.Scan(&test)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(test.toString())
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("select name from test where key = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	var name string
	err = stmt.QueryRow("3").Scan(&name)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(name)

	_, err = db.Exec("delete from test")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("insert into test(key, value) values(1, 'foo'), (2, 'bar'), (3, 'baz')")
	if err != nil {
		log.Fatal(err)
	}

	rows, err = db.Query("select id, name from test")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var name string
		err = rows.Scan(&id, &name)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(id, name)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

}
