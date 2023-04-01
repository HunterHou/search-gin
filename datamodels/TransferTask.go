package datamodels

import "time"

type TransferTaskModel struct {
	Name       string
	Path       string
	From       string
	To         string
	CreateTime time.Time
	FinishTime time.Time
	Status     string
	Log        string
}

func NewTaskWithTime(path string, name string, from string, to string, now time.Time) TransferTaskModel {
	res := TransferTaskModel{
		Path:       path,
		Name:       name,
		From:       from,
		To:         to,
		CreateTime: now,
		FinishTime: now,
	}
	return res
}
func NewTask(path string, name string, from string, to string) TransferTaskModel {
	res := TransferTaskModel{
		Path:       path,
		Name:       name,
		From:       from,
		To:         to,
		CreateTime: time.Now(),
	}
	return res
}

func (p *TransferTaskModel) SetStatus(sts string) {
	p.Status = sts
}

func (p *TransferTaskModel) GetLast() int64 {
	return p.FinishTime.Unix() - p.CreateTime.Unix()/1000
}

func (p *TransferTaskModel) SetLog(log string) {
	p.Log = log
}