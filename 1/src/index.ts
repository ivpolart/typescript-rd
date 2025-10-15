const name: string = 'Ivan';
const birthday: Date = new Date('2000-05-25');;
let phone: string | undefined = '0994384111';
let address: string | undefined = undefined;

const getUserInfo = (name: string, birthday: Date, phone: string | undefined, address: string | undefined) => {
    const birthdayDate = birthday.toISOString().split("T")[0];
    console.log(`Hi! My name is ${name}! My birthday: ${birthdayDate}. My phone: ${phone} and my address ${address}`);
}

getUserInfo(name, birthday, phone, address);