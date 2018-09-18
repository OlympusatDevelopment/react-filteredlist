const theme = {
    chipsContainer: {
      display: "flex",
      position: "relative",
      border: "1px solid #a0a0a0",
      backgroundColor: '#fff',
      font: "13.33333px Arial",
      minHeight: 24,
      alignItems: "center",
      flexWrap: "wrap",
      padding: "2.5px",
      borderRadius: "0.25rem",
      ':focus': {
          border: "1px solid #aaa",
      }
    },
    container:{
      flex: 1,
    },
    containerOpen: {
  
    },
    input: {
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      width: '100%',
      padding: "5px 0px",
      margin: 2.5,
      fontSize: '10px',
      ':placeholder': {
        fontSize: '10px'
      }
    },
    suggestionsContainer: {
    },
    suggestionsList: {
      position: 'absolute',
      border: '1px solid #ccc',
      zIndex: 10,
      left: -1,
      top: '99%',
      width: '100.5%',
      backgroundColor: '#fff',
      listStyle: 'none'
    },
    suggestion: {
      padding: '2px 5px',
      fontSize: '10px'
    },
    suggestionHighlighted: {
      background: '#EDEDED'
    },
    sectionContainer: {
  
    },
    sectionTitle: {
  
    },
  };

export const chipTheme = {
	chipSelected: {
		background: "#fff",
	},
	chip: {
		display: "flex",
		fontSize: '11px',
		alignItems: "center",
		boxSizing: 'border-box',
		color: "#999",
		background: "#ddd",
		margin: "2.5px",
		cursor: 'default',
	},
	chipRemove: {
		textAlign: "center",
		cursor: "pointer",
		fontSize: 14,
		width: 15,
		height: 15,
		lineHeight: '14px',
		fontWeight: 'none',
		color: "#999",
		borderRadius: '50%',
		border: '1px solid #999',
		marginLeft: 5,
		':hover': {
			color: '#666',
			border: '1px solid #666',
		}
	}
}
  
export default theme;