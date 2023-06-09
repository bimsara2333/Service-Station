class Features{
    
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex : this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);
        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr};

        console.log(queryCopy);

        //removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el] );

        console.log(queryCopy);

        //Advanced filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)

        console.log("queryStr  " + queryStr);

        queryStr = queryStr.replace( /\b(gt|gte|lt|lte)\b/g, match=> `$${match}`);

        console.log("queryStr after " + queryStr);
            
        console.log(queryCopy);

        this.query =this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = Features;