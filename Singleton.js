const mysql = require('mysql2/promise');

class DatabaseConnection {
    static instance;

    constructor(connection) {
        this.connection = connection;
    }

    static async getInstance() {
        if (!DatabaseConnection.instance) {
            console.log('Criando conexão com o banco...');

            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'padrao_criacional'
            });

            DatabaseConnection.instance = new DatabaseConnection(connection);
        }

        return DatabaseConnection.instance;
    }

    getConnection() {
        return this.connection;
    }
}

async function main() {
    const db1 = await DatabaseConnection.getInstance();
    const db2 = await DatabaseConnection.getInstance();

    console.log(db1 === db2);

    const [rows] = await db1.getConnection().query('SELECT NOW() AS data');

    console.log(rows);
}

main();