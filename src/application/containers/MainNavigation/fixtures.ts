const img01 = require('./images/menu-img-1.jpg');
const img02 = require('./images/menu-img-2.jpg');
const img03 = require('./images/menu-img-3.jpg');
const img04 = require('./images/menu-img-4.jpg');
const img05 = require('./images/menu-img-5.jpg');
const img06 = require('./images/menu-img-6.jpg');

export type IRelatedProductDataFixture = {
    sku: number | string;
    image: string;
    title: string;
};

export const fixtures = [
    {
        relatedCategoryId: 5,
        relatedProducts: [
            {
                sku: 115,
                image: img01,
                title: 'DELL OptiPlex 3020'
            },
            {
                sku: 183,
                image: img02,
                title: 'Sony Xperia SGP512E1'
            },
            {
                sku: 134,
                image: img06,
                title: 'Acer Aspire S7'
            }
        ]
    },
    {
        relatedCategoryId: 2,
        relatedProducts: [
            {
                sku: '009',
                image: img03,
                title: 'Canon IXUS 285'
            },
            {
                sku: '188',
                image: img04,
                title: 'Ricoh WG-5 GPS'
            },
            {
                sku: '201',
                image: img05,
                title: 'Sony NEX-VG20EH'
            }
        ]
    }
];
