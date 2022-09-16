const app = require('./src/app');
const sequelize = require('./config/database');


sequelize.sync();

const PORT = 3000;
app.listen(PORT, () => console.log('server is running!!'))