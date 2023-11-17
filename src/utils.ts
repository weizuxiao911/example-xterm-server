const utils = {
    query: {
        parse(request: any): any {
            const query = {}
            const str = request?.url?.split("?")[1]
            str?.split("&")?.forEach((pair: string) => {
                try {
                    const [key, value] = pair.split('=')
                    query[key] = decodeURIComponent(value ?? '')
                } catch (error) {
                    console.log('query parse error ->', error)
                }
            })
            return query
        }
    }
}

export default utils