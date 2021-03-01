import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {}
        this.dataSlice = this.dataSlice.bind(this)
    }

    componentWillMount() {
        this.dataSlice(this.props.data, this.props.pageSize);
      }

    dataSlice(data, count) {
        const pagesCount = Math.ceil(data.length / count);
        const pageArr = []
        for (let i = 1; i <= pagesCount; i++) {
            pageArr.push(i)
        }
        this.setState({pageArr})
        let n = 0;
        let j = count;
        const pageData = [];
        while(n <= data.length) {
            pageData.push(data.slice(n, j))

            n += count;
            j += count;
        }
        this.setState({
            pageData
        })
        this.props.pageDefalut(pageData[0], this.dataSlice)
    }

    render(){
        return(
            <div>
                {
                    this.state.pageArr.map((page, index)=> {
                        return(
                            <span
                            key={index}
                            className={this.props.currentPage === page ? 'selected-page' : ''} 
                            onClick={ev => this.props.onClickPage(page)}
                            >{page}</span>
                        )
                    })
                }
            </div>
        )
    }
}

export default Pagination;