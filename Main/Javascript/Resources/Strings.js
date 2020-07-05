const string_loading = 'در حال دریافت اطلاعات…';

function string_search_placeholder() {
    return `در ${appName} جستجو کنید`;
}

const string_error_in_search = 'خطا در دریافت نتایج جستجو';

function string_nothing_found_for(query) {
    return `نتیجه‌ای برای «${query}» پیدا نشد.`;
}

function string_username(name) {
    return `نام کاربری: ${name}`;
}

const string_login_to_account = 'ورود به حساب کاربری';

const string_error_getting_login_code = 'خطا در دریافت کد لاگین';

function string_remaining_subscription_time(query) {
    return toPersianDigits(`${query} روز از اشتراک شما باقی مانده است.`);
}

function string_login_description() {
    let url = isFilimo() ? 'https://filimo.com/activate' : 'https://televika.com/activate';
    return `برای وصل کردن تلویزیون خود به ${appName} مراحل زیر را انجام دهید:
    
    یک دستگاه دیگر مانند گوشی موبایل یا لپ‌تاپ بیاورید و در آن یک مرورگر مثل سافاری یا کروم را باز کنید.
    به آدرس ${url} بروید.
    کد زیر را تایپ کنید تا تلویزیون شما به ${appName} وصل شود.
    
    همچنین می‌توانید به جای مراحل بالا،  کد QR را اسکن کنید.
    `;
}

function toPersianDigits(str) {
    if (str == null) {
        return null;
    }

    return str.replace(/0/g, "۰")
        .replace(/1/g, "۱")
        .replace(/2/g, "۲")
        .replace(/3/g, "۳")
        .replace(/4/g, "۴")
        .replace(/5/g, "۵")
        .replace(/6/g, "۶")
        .replace(/7/g, "۷")
        .replace(/8/g, "۸")
        .replace(/9/g, "۹")
        .replace(/(,(?=\S)|:)/g, '، ')
        .replace(' ،', '،');
}

function removeHTMLEntities(str) {
    if (str == null) {
        return null;
    }

    return str.replace("&hellip;", "…")
        .replace("&zwnj;", "‌")
        .replace("&#039;", "'")
        .replace(/&\w+;/g, '');
}

function cleanup(str) {
    return removeHTMLEntities(toPersianDigits(str));
}