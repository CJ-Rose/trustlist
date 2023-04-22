import { schema } from '@unirep/core'
import { TableData } from 'anondb/node'
import { nanoid } from 'nanoid'

const _schema = [
    {
        name: 'AccountTransaction',
        primaryKey: 'signedData',
        rows: [
            ['signedData', 'String'],
            ['address', 'String'],
            ['nonce', 'Int'],
        ],
    },
    {
        name: 'AccountNonce',
        primaryKey: 'address',
        rows: [
            ['address', 'String'],
            ['nonce', 'Int'],
        ],
    },
    {
        name: 'for sale',
        primaryKey: '_id',
        rows: [
            ['epoch', 'Number'],
            ['section', 'String'],
            ['category', 'String'],
            ['title', 'String'],
            ['amount', 'String'],
            ['amountType', 'String'],
            ['description', 'String'],
            ['posterId', 'String'],
            ['pScore1', 'String'],
            ['pScore2', 'String'],
            ['pScore3', 'String'],
            ['pScore4', 'String'],
            ['responderId', 'String'],
            ['offerAmount', 'String'],
            ['rScore1', 'String'],
            ['rScore2', 'String'],
            ['rScore3', 'String'],
            ['rScore4', 'String'],
            ['dealOpened', 'Bool'],
            ['dealClosed', 'Bool'],
        ],
    },
]

export default _schema
    .map(
        (obj) =>
            ({
                ...obj,
                primaryKey: obj.primaryKey || '_id',
                rows: [
                    ...obj.rows,
                    {
                        name: '_id',
                        type: 'String',
                        default: () => nanoid(),
                    },
                ],
            } as TableData)
    )
    .concat(schema)
