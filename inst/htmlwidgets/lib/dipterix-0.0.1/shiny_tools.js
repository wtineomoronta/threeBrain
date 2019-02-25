/* JS to shiny callbacks

This file defines shiny callback functions (js to shiny)
*/

class THREE_BRAIN_SHINY {
  constructor(outputId) {

    // Check ID, must be a string
    if(typeof(outputId) === 'string'){
      this.outputId = outputId;
      this.valid = true;
    }else{
      this.valid = false;
      console.error('Constructor param outputId is not a string. Cannot initialize THREE_BRAIN_SHINY instance.');
    }

  }

  to_shiny(data, method = 'callback'){
    // method won't be checked, assuming string
    // Callback ID will be outputId_callbackname
    if(this.valid){
      let callback_id = outputId + '_' + method,
          re = {...data, '.__timestamp__.': new Date()};
      Shiny.onInputChange(callback_id, re);
    }
  }

}


