
const ExpandableCircle = React.createClass({

    statics: {
        initialSize: {
            borderRadius: 50,
            height: 100,
            width: 100
        },
        containerStyles: {
            width: 700,
            height: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto'
        }
    },

    getInitialState() {
        const {
            borderRadius,
            height,
            width
        } = ExpandableCircle.initialSize;

        return {
            styles: {
                borderRadius,
                height,
                width,
                background: 'red',
                cursor: 'pointer',
                transition: 'width 200ms, height 200ms, border-radius 200ms,left 200ms, top 200ms',
                MozTransition: 'width 200ms, height 200ms, border-radius 200ms,left 200ms, top 200ms',
                MsTransition: 'width 200ms, height 200ms, border-radius 200ms,left 200ms, top 200ms',
                OTransition: 'width 200ms, height 200ms, border-radius 200ms,left 200ms, top 200ms',
                WebkitTransition: 'width 200ms, height 200ms, border-radius 200ms,left 200ms, top 200ms'
            }
        }
    },

    getUpdatedSize() {
        const updatedStyles = Object.assign({}, this.state.styles);

        if (700 == updatedStyles.width) {
            return Object.assign(updatedStyles, ExpandableCircle.initialSize);
        }

        updatedStyles.borderRadius += 10;
        updatedStyles.height += 20;
        updatedStyles.width += 20;

        return updatedStyles;
    },

    handleOnClick() {
        this.setState({
            styles: this.getUpdatedSize()
        });
    },


    render() {
        return (
            <div style={ExpandableCircle.containerStyles}>
                <div style={this.state.styles} onClick={this.handleOnClick} />
            </div>
        );
    }

});

ReactDOM.render(
    <ExpandableCircle />,
    document.getElementById('root')
);