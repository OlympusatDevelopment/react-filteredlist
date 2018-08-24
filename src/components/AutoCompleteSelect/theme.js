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
      left: 0,
      top: '100%',
      width: '100%',
      backgroundColor: '#fff',
      listStyle: 'none',
      padding: "10px 0px",
      margin: "5px 0 0 0",
    },
    suggestion: {
      padding: '8px 15px'
    },
    suggestionHighlighted: {
      background: '#ddd'
    },
    sectionContainer: {
  
    },
    sectionTitle: {
  
    },
  }
  
  export default theme;