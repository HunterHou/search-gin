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
    Page:number=1
    PageSize:number=14
    OnlyRepeat:boolean=false
    Keywords:string
    SortField:string='MTime'
    SortType:string='desc'
}

export{MovieQuery,MovieModel}