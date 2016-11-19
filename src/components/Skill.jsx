var React = require('react');
var Firebase = require('firebase');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            skill: this.props.skill.skill,
            textChanged: false
        }
    },
    componentWillMount: function () {
        this.fb = new Firebase(rootUrl + 'skills/' + this.props.skill.key);
    },
    handleTextChange: function (event) {
        this.setState({
            skill: event.target.value,
            textChanged:true
        });
    },
    handleDeleteClick: function() {
        this.fb.remove();
    },
    handleSaveClick: function(event) {
        this.fb.update({skill: this.state.skill});
        this.setState({textChanged: false});
    },
    handleUndoClick: function() {
        this.setState({
            skill: this.props.skill.skill,
            textChanged: false
        });
    },
    render: function () {
        return <div className="input-group">
           <input type="text"
              className="form-control"
              value={this.state.skill} 
              onChange={this.handleTextChange}
            />
            <span className="input-group-btn">
               {this.changesButtons()}
                <button 
                  className="btn btn-default"
                  onClick={this.handleDeleteClick}>
                   Supprimer
                </button>
           </span>
        </div>
    },
    changesButtons: function() {
        if(!this.state.textChanged) {
            return null
        } else {
            return [
                <button className="btn btn-default" 
                    onClick={this.handleSaveClick}>Sauver
                </button>,
                <button className="btn btn-default"
                    onClick={this.handleUndoClick}>Annuler
                </button>
            ]
        }
        
    }
});
    