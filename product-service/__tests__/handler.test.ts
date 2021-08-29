// import { main as getProductsList } from "../src/functions/getProductsList/handler"

// describe("This is a simple test", () => {
//     test("Check the hello function", () => {
//         console.log(getProductsList());
//     })
// })

// import { APIGatewayEvent } from "aws-lambda"
// import * as context from "aws-lambda-mock-context"
// import { main as hello } from "../src/functions/hello/handler"

// describe("This is a simple test", () => {
//     test("Check the hello function", () => {
//         const ctx = context()
//         const evt = {}
//         hello(evt as APIGatewayEvent, ctx)
//         ctx.Promise
//             .then((res: any) => {
//                 expect(res.statusCode).toBe(200)
//             })
//             .catch((err: any) => {
//                 // tslint:disable-next-line:no-console
//                 console.log("ERRR", err)
//             })
//     })
// })

import { APIGatewayProxyEvent } from "aws-lambda";
import { main as lambdaHandler } from "../src/functions/hello/handler";

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                a: "1"
            }
        } as any
        const result = await lambdaHandler(event)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(`Queries: ${JSON.stringify(event.queryStringParameters)}`);
    });
});