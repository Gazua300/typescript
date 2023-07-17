const con = require("./connection") 


con.raw(`
    CREATE TABLE promo_prime_users(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(255) NOT NULL,
        user ENUM('DEFAULT', 'ADM') NOT NULL
    )
`).then(()=>{
    console.log(`Table promo_prime_users was created`)
    con.destroy()
}).catch((error:any)=>{
    console.error(`Failed to create table: ${error}`)
    con.destroy()
})

con.raw(`
    CREATE TABLE promo_prime_contract(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        company VARCHAR(150)  NOT NULL,
        signedAt DATE NOT NULL,
        expiresAt DATE NOT NULL,
        contractName VARCHAR(150) NOT NULL,
        user_id VARCHAR(255) NOT NULL
    )
`).then(()=>{
    console.log(`Table promo_prime_contract was created`)
}).catch((error:any)=>{
    console.log(`Failed to create table: ${error}`)
})

con.raw(`
    CREATE TABLE promo_prime_tasks(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        user VARCHAR(50) NOT NULL,
        email VARCHAR(150) NOT NULL,
        moment VARCHAR(50) NOT NULL,
        task TEXT  NOT NULL
    )
`).then(()=>{
    console.log(`Table promo_prime_tasks was created`)
}).catch((error:any)=>{
    console.log(`Failed to create table: ${error}`)
})