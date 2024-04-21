package datamodels

import "time"

type TransferTaskModel struct {
	Name       string
	Path       string
	Type       string
	Start      string
	End        string
	From       string
	To         string
	CreateTime time.Time
	FinishTime time.Time
	Status     string
	Log        string

	Files        []string
	Dest         string
	DeleteSource bool
}

func NewMergeTask(files []string, dest string, DeleteSource bool) TransferTaskModel {
	res := TransferTaskModel{
		Files:        files,
		Type:         "合并",
		Dest:         dest,
		DeleteSource: DeleteSource,
		CreateTime:   time.Now(),
	}
	return res
}
func NewTask(path string, name string, from string, to string) TransferTaskModel {
	res := TransferTaskModel{
		Path:       path,
		Type:       "转码",
		Name:       name,
		From:       from,
		To:         to,
		CreateTime: time.Now(),
	}
	return res
}

func NewCutTask(path string, name string, start string, end string, to string) TransferTaskModel {
	res := TransferTaskModel{
		Path:       path,
		Type:       "分切",
		Name:       name,
		Start:      start,
		End:        end,
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
