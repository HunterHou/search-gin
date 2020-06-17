import React from 'react'
import PropTypes from 'prop-types'
import {Table,Popconfirm,Button} from     'antd'
import { connect } from 'dva';

const FileList = ({dispatch,files})=>{

    function onDelete(id){
        dispatch({
            type:"files/delete",
            payload:id
        })
    }

    const columns=[
        {title:"Name",dataIndex:"name"},
        {title:"Actions",render:(text,record)=>{
            return(
                <Popconfirm title="Delete?" onConfirm={()=>{
                    onDelete(record.dataIndex)
                }}>
                    <Button>Delete</Button>
                </Popconfirm>
            )
        }}
    ];

    console.log(files)
    return (
        <Table dataSource={files} columns={columns}/>
    );
}
FileList.prototype={
    onDelete:PropTypes.func.isRequired,
    fileList:PropTypes.array.isRequired
}

export default connect(({files })=>({
    files,
})) (FileList)
