class MovieModel{

    Id:number
    Tags:string[]
    MovieType:string
    Jpg:string
    Png:string
    Actress:string
    Code:string
    MTime:Date
    SizeStr:Date
    Name:Date


}

class MovieQuery extends MovieModel{
    Page=1
    PageSize=14
    OnlyRepeat=false
    Keyword:string
    SortField='MTime'
    SortType='desc'
}

export{MovieQuery,MovieModel}