export class Cookie {

    static getCookie = (name: string) => {
        const matches = document.cookie.match(
            new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static setCookie(name: string, value: string, props?: { [x: string]: unknown; expires?: number; } | undefined) {
        props = props || {};
        value = encodeURIComponent(value);
        let updatedCookie = name + '=' + value;
        for (const propName in props) {
            updatedCookie += '; ' + propName;
            const propValue = props[propName];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    static deleteCookie = (name: string) => {
        this.setCookie(name, "", { expires: -1 });
    }
}