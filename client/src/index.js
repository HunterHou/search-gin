import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
    initialState:{
        "files":[
            {"name":"a","id":"a"},{"name":"b","id":"b"},{"name":"c","id":"c"},
        ]
    }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/FileModel').default);

// 4. Router
app.router(require('./router').default);
console.log(app)
// 5. Start
app.start('#root');
