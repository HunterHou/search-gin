class ListItem extends React.Component {

    render() {
        let dataList = [];
        let cnt = 0
        fetch("/index").then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
        }).then(function (json) {
            cnt = json["Cnt"]
            const {data: dataListTwo = []} = json
            dataList = dataListTwo
        })
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>现在是 {cnt}.</h2>
            </div>
        );
    }
}

export default ListItem