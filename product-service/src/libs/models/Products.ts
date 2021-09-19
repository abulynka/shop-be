import { PGClient } from "@libs/db/PGClient";

export class Products {
    public async getProducts(): Promise<{ [key: string]: string }[]> {
        const db = await PGClient.getInstance();
        await db.connect();
        await db.begin();
        const results = await db.query(`
            select p.id,
                s.count,
                p.price,
                p.title,
                p.description
            from shop.products as p
                inner join shop.stocks as s on s.product_id = p.id
        `);
        await db.commit();
        await db.disconnect();
        return await results.assocAll();
    }

    public async getProductById(id: string): Promise<{ [key: string]: string }> {
        const db = await PGClient.getInstance();
        await db.connect();
        await db.begin();
        const results = await db.query(`
            select p.id,
                    s.count,
                    p.price,
                    p.title,
                    p.description
                from shop.products as p
                    inner join shop.stocks as s on s.product_id = p.id
                where p.id = $1
            `,
            [id]
        );
        await db.commit();
        await db.disconnect();
        return await results.assoc();
    }

    public async createProduct(product: { [key: string]: string }): Promise<string> {
        const { title, description, price, count } = product;

        const db = await PGClient.getInstance();
        await db.connect();
        await db.begin();
        const results = await db.query(`
            with returning_id as (
                 insert
                   into shop.products
                        (title, description, price)
                        values
                        ($1, $2, $3)
                        returning id
            )
            insert
              into shop.stocks
                   (product_id, count)
                   values
                   ((select id from returning_id), $4)
            returning (select id from returning_id) as id
            `,
            [
                title,
                description,
                price,
                count
            ]
        );
        await db.commit();
        await db.disconnect();
        return await results.getOne('id');
    }
}
