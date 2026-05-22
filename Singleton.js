const mysql = require('mysql2/promise');

class DatabaseConnection {
    static instance = null;

    constructor(connection) {
        // Simula construtor privado
        if (DatabaseConnection.instance) {
            throw new Error('Use DatabaseConnection.getInstance()');
        }

        this.connection = connection;
    }

    static async getInstance() {
        // Lazy initialization
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

/*
|--------------------------------------------------------------------------
| Teste
|--------------------------------------------------------------------------
*/

async function main() {
    try {
        const db1 = await DatabaseConnection.getInstance();
        const db2 = await DatabaseConnection.getInstance();

        // Verifica se é a mesma instância
        console.log(db1 === db2); // true

        // Executa consulta real
        const [rows] = await db1
            .getConnection()
            .query('SELECT NOW() AS data_atual');

        console.log(rows);

    } catch (error) {
        console.error(error.message);
    }
}

main();