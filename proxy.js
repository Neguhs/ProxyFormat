const fs = require('fs');

const proxy = {};

proxy.readProxies = file => {
    const proxyList = fs.readFileSync(file , 'utf8', (err , data) => {
        if(err) return;
        return data;
    })
    return proxyList;
}

proxy.formatProxies = proxyList =>{
    let validProxies = [];
        const proxies  = proxyList.replace('\r', "").split('\n');
        if(proxies.length > 0){
            proxies.forEach(proxy =>{
                const proxySplit = proxy.split(':');
                    if(proxySplit.length > 3){
                        validProxies.push((`https://${proxySplit[2]}:${proxySplit[3]}@${proxySplit[0]}:${proxySplit[1]}`));
                    } else {
                        validProxies.push((`https://${proxySplit[0]}:${proxySplit[1]}`));
                    }
            })
        }
        return validProxies;
}

proxy.roatatedProxy = validProxies => {
    let newProxy = validProxies[Math.floor(Math.random() * validProxies.length)];
    return newProxy;
}

