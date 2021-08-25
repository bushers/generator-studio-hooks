import fb from './services/Firebase';
import { singleton as jump } from './helpers/jump';

export const SCROLL_TO_SECTION = (id: string, offset = 0) => {
    const el: HTMLElement = document.getElementById(id);

    if (el) {
        jump(el, {
            duration: 800,
            offset,
        });
    }
};

export const GET_FIREBASE_DATA = async () => {
    return new Promise((res, rej) => {
        const database = fb.database();
        database
            .ref('/')
            .once('value')
            .then((snapshot) => {
                res(snapshot.val());
            });
    });
};

export const ADD_RANKS_TO_DATA = (data: any[], rankKey: string): any[] => {
    const arr: any[] = [];
    const nestedKeys = rankKey.split('.');
    const isNested = nestedKeys.length === 2;

    data.forEach((e, i) => {
        const obj = { ...e, rank: i + 1 };
        const val = isNested ? obj[`${nestedKeys[0]}`][`${nestedKeys[1]}`] : obj[`${rankKey}`];
        const prevObj = i > 0 && arr[i - 1];

        if (i === 0) {
            obj.rank = 1;
        }

        const prevVal = isNested ? prevObj?.[`${nestedKeys[0]}`]?.[`${nestedKeys[1]}`] : prevObj[`${rankKey}`];
        if (i > 0 && val === prevVal) {
            obj.rank = prevObj.rank;
        }
        arr.push(obj);
    });

    return arr;
};

export const NUMBER_FORMAT_FUNCTION = {
    numberWithCommas: (x) => {
        const s = '.';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
    },
    currencyNumber: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === '£-'
            ? 'N/A'
            : (x < 0 ? '-' : '') +
                  symbol +
                  Math.abs(x)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    decimal: (x, decimalPoints) => {
        return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')).toFixed(decimalPoints);
    },
    percent: (x) => {
        x = x * 100;
        return x.toFixed(x < 1 ? 2 : x < 10 ? 1 : 0) + '%';
    },
    seCurrency: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === '£-'
            ? 'N/A'
            : (x < 0 ? '-' : '+') +
                  symbol +
                  Math.abs(x)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    reverseCurrencyNumber: function (x, symbol) {
        x = parseInt(x).toFixed(0);
        return (
            Math.abs(x)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + symbol
        );
    },
    addPostFix: (labelValue: number, decimalPlaces: number, label: string) => {
        return Math.abs(Number(labelValue)) >= 1.0e9
            ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(decimalPlaces) + label
            : // Six Zeroes for Millions
            Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(decimalPlaces) + label
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
            ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(decimalPlaces) + label
            : Math.abs(Number(labelValue));
    },
};
