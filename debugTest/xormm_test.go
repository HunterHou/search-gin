package debugTest

import (
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"testing"
	"xorm.io/xorm"
)

func TestXormQ(t *testing.T) {
	engine, err := xorm.NewEngine("sqlite3", "test")
	if err != nil {
		t.Log(err)
	}
	var res []Libb
	err = engine.Table("libb").Where("value like ? ", "%value%").Find(&res)
	if err != nil {
		t.Log(err)
	}
	for _, re := range res {
		t.Logf("%v", re)
	}

}

func TestXorm(t *testing.T) {
	engine, err := xorm.NewEngine("sqlite3", "test")
	if err != nil {
		t.Log(err)
	}
	err = engine.Sync(new(Libb))
	todo := []Libb{}
	for i := 0; i < 10; i++ {
		todo = append(todo, Libb{fmt.Sprintf("%d", i), fmt.Sprintf("value %d ", i)})
	}
	affectRows, err := engine.Insert(&todo)
	if affectRows > 0 {
		t.Log(affectRows)
	}

}

type Libb struct {
	Key   string
	Value string
}

func (l *Libb) toString() string {
	return fmt.Sprintf(" key: %v,value:%v", l.Key, l.Value)
}
