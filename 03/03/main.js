const DEFAULT_COLOR = 'yellow';

const NOTES_PALLETE_COLORS = [
    "#e0963b",
    "#f3ec0d",
    "#d9b9e6",
    "#1fc1e6",
    "#8bcbda",
    "#92f195"
];

const Note = React.createClass({
    handleDelete() {
        this.props.onDelete(this.props.id);
    },

    render() {
        const {
            color,
            children,
            onDelete
        } = this.props;

        return (
            <div className="note" style={{ backgroundColor: color }}>
                <span className="note__delete-icon" onClick={this.handleDelete}> × </span>
                {children}
            </div>
        );
    }
});

const NoteEditor = React.createClass({
    getInitialState() {
        return {
            text: ''
        };
    },

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    },

    handleNoteAdd() {
        const newNote = {
            text: this.state.text,
            color: this.state.selectedColor || DEFAULT_COLOR,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);

        this.resetState();
    },

    handleColorChange(color) {
        this.setState(Object.assign({}, this.state, { selectedColor: color }));
    },

    resetState() {
        this.setState({
            text: ''
        });
    },

    render() {
        return (
            <div className="editor">
                <textarea
                    rows={5}
                    placeholder="Enter your note here..."
                    className="editor__textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />

                <div className="editor__footer">
                    <ColorPallete
                        colors={NOTES_PALLETE_COLORS}
                        onColorChange={this.handleColorChange}
                    />
                    <button className="editor__button" onClick={this.handleNoteAdd}>Add</button>
                </div>
            </div>
        );
    }
});

const NotesGrid = React.createClass({
    componentDidMount() {
        const grid = this.grid;

        this.msnry = new Masonry(grid, {
            columnWidth: 240,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render() {
        const {
            notes,
            onNoteDelete
        } = this.props;

        return (
            <div className="grid" ref={c => this.grid = c}>
                {
                    notes.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            color={note.color}
                            onDelete={onNoteDelete}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </div>
        );
    }
});

const NotesApp = React.createClass({
    getInitialState() {
        return {
            notes: []
        };
    },

    componentDidMount() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));

        if (savedNotes) {
            this.setState({ notes: savedNotes });
        }
    },

    componentDidUpdate() {
        const notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
    },

    handleNoteDelete(noteId) {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    },

    handleNoteAdd(newNote) {
        this.setState({
            notes: [newNote, ...this.state.notes]
        });
    },

    render() {
        return (
            <div className="app">
                <h2 className="app__header">NotesApp</h2>

                <NoteEditor onNoteAdd={this.handleNoteAdd} />

                <NotesGrid
                    notes={this.state.notes}
                    onNoteDelete={this.handleNoteDelete}
                />
            </div>
        );
    }
});

const ColorPallete = React.createClass({

    getInitialState() {
        return {
            selectedColor: this.props.defaultColor || null
        }
    },

    componentWillMount() {
        if (this.props.colors && this.props.colors.length > 0) {
            this.setState({
                selectedColor: this.props.colors[0]
            });
        }
    },

    handleColorSelect(color) {
        if (this.props.onColorChange) {
            this.props.onColorChange(color);
        }

        this.setState({
            selectedColor: color
        });
    },

    render() {
        return (
            <div className="color-pallete">
                {
                    this.props.colors.map(color =>
                        <ColorPalleteItem
                            key={color}
                            color={color}
                            selectedColor={this.state.selectedColor}
                            onClick={this.handleColorSelect}
                        />
                    )
                }
            </div>
        )
    }

});

const ColorPalleteItem = React.createClass({

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.color);
        }
    },

    render() {
        return (
            <div className="color-pallete-item" style={{ backgroundColor: this.props.color }} onClick={this.handleClick}>
                {
                    this.props.color === this.props.selectedColor
                        ? <i className="fa fa-check" />
                        : null
                }
            </div>
        );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('root')
);
