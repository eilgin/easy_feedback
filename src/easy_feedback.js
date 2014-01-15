
(function(window, document, undefined) {
    

"use strict";

// fabric.js AND html2canvas must be imported BEFORE executing this script !

/// this will contained the fabric.js canvas
var fabric_canvas;

// the following picture are all 20px wide and 19px high
var final_min_button_saturate_grey = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAQAAAA6heU+AAABBGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAABjTY2Bg3ODo4uTKJMDAkJtXUuQe5BgZERmlwH6egY2BmQEMEpOLC3yD3UJA7Lz8vFQGVMDIwPDtGohkYLisCzKLgTTAmlxQVAKkDwCxT0pqcTLQSB4gO7O8pAAozlgBZIskZYPZPSB2dkiQM5C9AMjmK0mtAOllcM4vqCzKTM8oUdBI1lQwtLS0VHBMyU9KVQiuLC5JzS1W8MxLzi8qyC9KLElN0VNwzMlRCAIpL1YISi1OLSoDCjJA7AYDfveixEoF98Tc3EQFIz0jBqoDUBhDWJ9DwGHHKHYeIYYAyaVFZbBwZjJmYAAAvwZAKp/6Y/cAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90LERIJLAG5BA4AAAIkSURBVCjPVZJNSJRBHMZ/M6+2bmW7Rpu1btuGEqgI5mEUI/pQEibo62IQHiKDUIzI8BBFHxAdDEKEDkEdqosQiBGjWBAVErwblXmy0qTaFCvdTQK3Xfft8OqWM5eB5zfP8/yZEaCwAVBVHKeeMAtM8JR7vOWPnVWFe1A+LtDO8vWEDkbstEtIAJXPNdpx+E6MH2QWwXqiNCmPjQIE7JDJo9xlll76mSbILuooyfp20GmjoEWVrVHDal61/ctUNapfOdndDAprW9dU2mrhvn0OwPCBGLGvRc8pc10dUkWhl9FpKTda10nyqbLsVDguNW4j+wvnGQeQ7/aPiiMgV8cJkuO0+m4GamdygSX0Fb2kMhwaqalriAQr5Yb3DkkrvT4YKFkXy3E7uig9JKzBir0FhcXVvpCMxAIzZ6lMbF4IVM15lsaxATuanmuYDga2EC6srpBy1Dtxg7HPpTJ9mHwwS5MDyYGq0km+MUeoXDqPd8Yz8fL5ooKMjwYj//cMvbAi/JrEK1Ztkv5UZKCxZ3cyFQSuENKYrOueIaFoEvDbkydgMOQMZcKOqz3ihJ4Cg6abNsD0cCCn841fgJE0coc8wEHQx1UddW8ZwTFuM+6tfVggDBrjoZ2LrFhM/MgDXjODn+2cxMtp3QXCjTEraeYy/uxz/yRBPgHgFq06bVwQNCaXGs5wcNmPdLhEt541aMRiGzRg1lLMPqrZisUYz+hjVM+72l8CJr45YngKtwAAAABJRU5ErkJggg==";
var final_min_button_saturate_color = "data:image/png;base64,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";

var pen_icon = "data:image/png;base64,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";
var highlight_icon = "data:image/png;base64,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";
var note_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAL1JREFUeNrs17FLQkEcB/AP5mhbS6tWf6lbi4q1SJuTuDqk9Ce8zUWEHBweBDU0iFstNzzk9RDslcPvB18O7rj7DHfD/aivWsiwxwfe07jDqkbXJdb4KkleJ9zADdqYJnCOW9z5oxoleFqcHGOB2S/mOSHXVXD+wz2cmk90Ai7CXTxiUJI+etgeHPqGYVor2/eAe1xVwcfUywGcoXnqqw444IADDjjggAOurCdssMQrJrg41w/9v7UwlU3b9wBupxCp7GuHtQAAAABJRU5ErkJggg==";

var efb_mainContainerID = "efb-main-container";
var efb_buttonCssName = "efb-feedback-button";
var efb_panelCssName = "efb-feedback-panel";

var efb_panelForm = "efb-pan-form";
var efb_panelHeader = "efb-pan-header";
var efb_panelActions = "efb-pan-actions";
var efb_panelDescription = "efb-pan-description";
var efb_panelFooter = "efb-pan-footer";

var efb_panelHelpButton = "efb-pan-help-button";
var efb_panelMinimizeButton = "efb-pan-minimize-button";
var efb_panelCloseButton = "efb-pan-close-button";
var efb_panelPenButton = "efb-pan-pen-button";
var efb_panelHighlightButton = "efb-pan-highlight-button";
var efb_panelNoteButton = "efb-pan-note-button";
var efb_panelComments = "efb-pan-comments";
var efb_panelCancelButton = "efb-pan-cancel-button";
var efb_panelSendButton = "efb-pan-send-button";

var efb_panelRoundButton = "efb-pan-round-button";
var efb_panelCircleButton = "efb-pan-circle-button";
var efb_panelSquareButton = "efb-pan-square-button";

var efb_overlay = "efb-overlay";
var efb_canvas = "efb-canvas";
var efb_lock_body = "efb-lock-body";

var buttonTitle = "Envoie un screenshot de vos suggestions à l'équipe de développement";
var buttonContent = "Suggestions";

var panelHelp = "?";
var panelMinimize = "&ndash;";
var panelMaximize = "&#9744;";
var panelClose = "X";
var panelCancel = "Annuler";
var panelSend = "Envoyer";
var panelPen = "Dessiner";
var panelHighlight = "Surligner";
var panelNote = "Noter";
var panelComment = "Ajouter vos commentaires ici...";

var iTextContent = "";


var efb_style = document.createElement('style');
efb_style.type = 'text/css';

efb_style.innerHTML = "#" + efb_mainContainerID + " {";
efb_style.innerHTML += "font-family:Arial, sans-serif;";
efb_style.innerHTML += "text-align:left;";
efb_style.innerHTML += "color:#717171;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_buttonCssName + " {";
efb_style.innerHTML += "position: fixed;";
efb_style.innerHTML += "bottom: 0; right: 30px;";
efb_style.innerHTML += "display: block;";
efb_style.innerHTML += "overflow: hidden;";
efb_style.innerHTML += "cursor: pointer;";
efb_style.innerHTML += "z-index:2147483647;"; /// @see http://www.w3.org/TR/CSS21/visuren.html#z-index
efb_style.innerHTML += "font-size:13px;";
efb_style.innerHTML += "font-weight:bold;";
efb_style.innerHTML += "border: 1px solid #D5D5D5;";
efb_style.innerHTML += "border-bottom: none;";
efb_style.innerHTML += "border-top-left-radius: 5px;";
efb_style.innerHTML += "border-top-right-radius: 5px;";
efb_style.innerHTML += "background-color:#F7F7F7;";
efb_style.innerHTML += "background-image: url(" + final_min_button_saturate_grey + ");";
efb_style.innerHTML += "background-repeat: no-repeat;";
efb_style.innerHTML += "background-position: 5px;";
efb_style.innerHTML += "height:25px;";
efb_style.innerHTML += "padding: 0 5px 0 30px;";
efb_style.innerHTML += "}\n";
efb_style.innerHTML += "#" + efb_buttonCssName + ":hover {";
efb_style.innerHTML += "color:#3D3D3D;";
efb_style.innerHTML += "background-color: #FAFAFA;";
efb_style.innerHTML += "background-image: url(" + final_min_button_saturate_color + ");";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelCssName + " {";
efb_style.innerHTML += "position: fixed;";
efb_style.innerHTML += "bottom: 0; right: 15px;";
efb_style.innerHTML += "display: none;";
efb_style.innerHTML += "overflow: hidden;";
efb_style.innerHTML += "z-index:2147483647;";
efb_style.innerHTML += "font-size:12px;";
efb_style.innerHTML += "border-top-left-radius: 5px;";
efb_style.innerHTML += "border-top-right-radius: 5px;";
efb_style.innerHTML += "background-color:#F7F7F7;";
efb_style.innerHTML += "width:250px;";
efb_style.innerHTML += "height:250px;";
efb_style.innerHTML += "padding: 5px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelForm + " {";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "." + efb_panelHeader + " {";
efb_style.innerHTML += "position: relative;";
efb_style.innerHTML += "height: 20px;";
efb_style.innerHTML += "margin-bottom: 10px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "." + efb_panelActions + " {";
efb_style.innerHTML += "margin-bottom: 10px;";
efb_style.innerHTML += "text-align:center;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "." + efb_panelDescription + " {";
efb_style.innerHTML += "margin-bottom: 10px;";
efb_style.innerHTML += "text-align:center;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "." + efb_panelFooter + " {";
efb_style.innerHTML += "position: relative;";
efb_style.innerHTML += "height: 22px;";
efb_style.innerHTML += "margin-bottom: 10px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelHelpButton + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "left:0;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelMinimizeButton + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "right:25px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelCloseButton + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "right:0;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelPenButton + " {";
efb_style.innerHTML += "background-image: url(" + pen_icon + ");";
efb_style.innerHTML += "background-repeat: no-repeat;";
efb_style.innerHTML += "background-position: center 5px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelHighlightButton + " {";
efb_style.innerHTML += "background-image: url(" + highlight_icon + ");";
efb_style.innerHTML += "background-repeat: no-repeat;";
efb_style.innerHTML += "background-position: center 5px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelNoteButton + " {";
efb_style.innerHTML += "background-image: url(" + note_icon + ");";
efb_style.innerHTML += "background-repeat: no-repeat;";
efb_style.innerHTML += "background-position: center 5px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelComments + " {";
efb_style.innerHTML += "font-family:Arial, sans-serif;";
efb_style.innerHTML += "width: 235px;";
efb_style.innerHTML += "height: 100px;";
efb_style.innerHTML += "overflow: auto;";
efb_style.innerHTML += "resize: none;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelCancelButton + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "left:0;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_panelSendButton + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "right:0;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "input." + efb_panelCircleButton + " {";
efb_style.innerHTML += "width: 20px;";
efb_style.innerHTML += "height: 20px;";
efb_style.innerHTML += "padding: 0;";
efb_style.innerHTML += "line-height:20px;";
efb_style.innerHTML += "font-size:12px;";
efb_style.innerHTML += "font-weight:bold;";
efb_style.innerHTML += "text-align:center;";
efb_style.innerHTML += "text-transform:uppercase;";
efb_style.innerHTML += "color:#444444;";
efb_style.innerHTML += "border: 1px solid #CACACA;";
efb_style.innerHTML += "border-radius:10px;";
efb_style.innerHTML += "}\n";
efb_style.innerHTML += "input." + efb_panelCircleButton + ":hover {";
efb_style.innerHTML += "border-color: #969696;";
efb_style.innerHTML += "cursor:pointer;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "input." + efb_panelSquareButton + " {";
efb_style.innerHTML += "width: 80px;";
efb_style.innerHTML += "height: 65px;";
efb_style.innerHTML += "padding: 2px;";
efb_style.innerHTML += "padding-top: 40px;";
efb_style.innerHTML += "font-size:10px;";
efb_style.innerHTML += "font-weight:bold;";
efb_style.innerHTML += "text-align:center;";
efb_style.innerHTML += "text-transform:uppercase;";
efb_style.innerHTML += "color:#009AB8;";
efb_style.innerHTML += "background-color: #F0F0F0;";
efb_style.innerHTML += "border: 1px solid #DADADA;";
efb_style.innerHTML += "border-radius:3px;";
efb_style.innerHTML += "}\n";
efb_style.innerHTML += "input." + efb_panelSquareButton + ":hover {";
efb_style.innerHTML += "cursor:pointer;";
efb_style.innerHTML += "background-color: #E7E7E7;";
efb_style.innerHTML += "border: 1px solid #969696;";
efb_style.innerHTML += "border-radius:3px;";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "input." + efb_panelRoundButton + " {";
efb_style.innerHTML += "width: 80px;";
efb_style.innerHTML += "height: 22px;";
efb_style.innerHTML += "font-size:14px;";
efb_style.innerHTML += "color:#444444;";
efb_style.innerHTML += "border: 1px solid #CACACA;";
efb_style.innerHTML += "border-radius:5px;";
efb_style.innerHTML += "}\n";
efb_style.innerHTML += "input." + efb_panelRoundButton + ":hover {";
efb_style.innerHTML += "border-color: #969696;";
efb_style.innerHTML += "}\n";
  
efb_style.innerHTML += "#" + efb_overlay + " {";
efb_style.innerHTML += "position: absolute;";
efb_style.innerHTML += "top: 0;";
efb_style.innerHTML += "left: 0;";
efb_style.innerHTML += "width: 100%;";
efb_style.innerHTML += "height: 100%;";
// be careful that this z-index is lower or equal than button, strokes and other
// drawing objects from efb_overlay
efb_style.innerHTML += "z-index:2147483640;";
efb_style.innerHTML += "background-color: rgba(102, 102, 102, 0.5);";
efb_style.innerHTML += "}\n";

efb_style.innerHTML += "#" + efb_canvas + " {";
efb_style.innerHTML += "}\n";

// css style for fabric js
efb_style.innerHTML += ".canvas-container, .lower-canvas, .upper-canvas  {";
efb_style.innerHTML += "position: absolute !important;";
efb_style.innerHTML += "top: 0;";
efb_style.innerHTML += "left: 0;";
efb_style.innerHTML += "width: auto !important;";
efb_style.innerHTML += "height: auto !important;";
efb_style.innerHTML += "background-color: transparent;";
efb_style.innerHTML += "}\n";


function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

/// HTML Content
var html = '<div id="' + efb_mainContainerID + '">';
html += '<div id="'+ efb_panelCssName + '" style="display:none">';
html += '  <form id="'+ efb_panelForm + '">';
html += '    <div class="' + efb_panelHeader + '">';
html += '      <input type="button" id="' + efb_panelHelpButton + '" class="' + efb_panelCircleButton + '" value="'+ panelHelp + '" style="display:none">';
html += '      <input type="button" id="' + efb_panelMinimizeButton + '" class="' + efb_panelCircleButton + '" value="'+ panelMinimize + '" onclick="toggleMinimizePanel()">';
html += '      <input type="button" id="' + efb_panelCloseButton + '" class="' + efb_panelCircleButton + '" value="'+ panelClose + '" onclick="toggleDisplayPanel()">';
html += '    </div>';
html += '    <div class="' + efb_panelActions + '">';
html += '      <input id="' + efb_panelPenButton + '" type="button" class="' + efb_panelSquareButton + '" value="' + panelPen + '" onclick="usePen(this)">';
html += '      <input id="' + efb_panelHighlightButton + '" type="button" class="' + efb_panelSquareButton + '" value="' + panelHighlight + '" onclick="useHighlight(this)">';
html += '      <input id="' + efb_panelNoteButton + '" type="button" class="' + efb_panelSquareButton + '" value="' + panelNote + '" onclick="useNote(this)">';
html += '    </div>';
html += '    <div class="' + efb_panelDescription + '">';
html += '      <textarea placeholder="' + panelComment + '" id="' + efb_panelComments + '" onfocus="resetCommand()"></textarea>';
html += '    </div>';
html += '    <div class="' + efb_panelFooter + '">';
html += '      <input id="' + efb_panelCancelButton + '" type="button" class="' + efb_panelRoundButton + '" value="' + panelCancel + '" onclick="cancelFeedback()">';
html += '      <input id="' + efb_panelSendButton + '" type="button" class="' + efb_panelRoundButton + '" value="' + panelSend + '" onclick="sendFeedback()">';
html += '    </div>';
html += '  </form>';
html += '</div>';
html += '<button id="'+ efb_buttonCssName + '" style="display:block" type="button" title="' + buttonTitle + '" onclick="toggleDisplayPanel()">' + buttonContent + '</button>';
html += '</div>';
html += '<div id="' + efb_overlay + '" style="display:none">';
html += '  <canvas id="' + efb_canvas + '"></canvas>';
html += '</div>';


function getDocumentHeight() {
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    return height;
}

function displayOverlay() {
    var overlay = document.getElementById(efb_overlay);
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    overlay.style.height = getDocumentHeight() + "px";
    overlay.style.display = "block";
}

function hideOverlay() {
    var overlay = document.getElementById(efb_overlay);
    overlay.style.display = "none";
}

function lockBody() {
    //document.body.style.overflow = "hidden";
}

function unlockBody() {
    //document.body.style.overflow = "visible";
}

window.fabric.Canvas.prototype.changeCanvasSize = function(width, height) {
    this.setWidth(width);
    this.setHeight(height);
    this.renderAll();
};

function displayCanvas() {
    
    if (!fabric_canvas) {
        fabric_canvas = new window.fabric.Canvas(efb_canvas);
        fabric_canvas.changeCanvasSize(window.innerWidth, getDocumentHeight());

        fabric_canvas.freeDrawingBrush.width = 15;
        fabric_canvas.freeDrawingBrush.color = "yellow";
        fabric_canvas.backgroundColor = '';
        
        fabric_canvas.selection = false;
    }
}

window.addEventListener('resize', function(event){
    if (fabric_canvas) {
        fabric_canvas.changeCanvasSize(window.innerWidth, getDocumentHeight());
    }
});

function hideCanvas() {
    fabric_canvas.clear();
    fabric_canvas.isDrawingMode = false;
}

function toggleDisplayPanel() {
    var button_feedback = document.getElementById(efb_buttonCssName);
    var feedback_panel = document.getElementById(efb_panelCssName);
    
    var cur_button_display_state = button_feedback.style.display;
    if (cur_button_display_state === "block") {
        displayOverlay();
        lockBody();
        displayCanvas();
        
        button_feedback.style.display = "none";
        feedback_panel.style.display = "block";
    } else {
        hideOverlay();
        unlockBody();
        hideCanvas();
        resetCommand();
        
        button_feedback.style.display = "block";
        feedback_panel.style.display = "none";
        feedback_panel.style.bottom = "0";
    }
}

function htmlEntitiesToString(htmlEntities) {
    
    var dummyElement = document.createElement("div");
    var html = '<input type="button" value="'+ htmlEntities + '">';
    appendHtml(dummyElement, html);

    return dummyElement.childNodes[0].value;
}

function toggleMinimizePanel() {
    var button_minimize = document.getElementById(efb_panelMinimizeButton);
    var feedback_panel = document.getElementById(efb_panelCssName);

    var cur_button_minimize_state = button_minimize.value;
    if ( cur_button_minimize_state === htmlEntitiesToString(panelMinimize) ) {
        button_minimize.value = htmlEntitiesToString(panelMaximize);
        feedback_panel.style.bottom = "-230px";
    } else {
        button_minimize.value = htmlEntitiesToString(panelMinimize);
        feedback_panel.style.bottom = "0";
    }
}

function resetCommand() {
    var penButton = document.getElementById(efb_panelPenButton);
    var highlightButton = document.getElementById(efb_panelHighlightButton);
    var noteButton = document.getElementById(efb_panelNoteButton);
    
    var buttons = [penButton, highlightButton, noteButton];
    for (var i in buttons) {
        var el = buttons[i];
        disableActionButtonStyle(el);
    }
    
    fabric_canvas.isDrawingMode = false;
    
    fabric_canvas.off("mouse:down", md_Highlight);
    fabric_canvas.off("mouse:move", mm_Highlight);
    fabric_canvas.off("mouse:up", mu_Highlight);
    
    fabric_canvas.off("mouse:down", md_Note);
    
    fabric_canvas.discardActiveObject();
}

function disableActionButtonStyle(targetEl) {
    targetEl.removeAttribute("style");
}

function enableActionButtonStyle(targetEl) {
    targetEl.style.backgroundColor = "#CACACA";
    targetEl.style.borderColor = "#8D8D8D";
}

function usePen(targetEl) {
    var penButton = document.getElementById(efb_panelPenButton);
    resetCommand();
    enableActionButtonStyle(targetEl);
            
    fabric_canvas.isDrawingMode = true;
    fabric_canvas.on("path:created", function(e){
    var freeHandPath = e.path;
    freeHandPath.selectable = false;
});
}


var started_mouse = false;
var x_mouse = 0;
var y_mouse = 0;

function md_Highlight(options) {
    var canCreate = true;
    if (options.target && options.target.get('type') === "rect") {
        canCreate = false;
    }

    if (canCreate) {
        started_mouse = true;

        x_mouse = options.e.clientX;
        y_mouse = options.e.clientY + document.body.scrollTop;

        var square = new window.fabric.Rect({ 
            width: 0, 
            height: 0, 
            left: x_mouse, 
            top: y_mouse, 
            fill: 'yellow',
            opacity: 0.2
        });

        square.hasControls = false;
        square.set({
            borderColor: "red",
            borderOpacityWhenMoving:1
        });

        fabric_canvas.add(square); 
        fabric_canvas.renderAll();
        fabric_canvas.setActiveObject(square);
    }
}
function mm_Highlight(options) {
    if(!started_mouse) {
        return false;
    }
    
    var x = options.e.clientX;
    var y = options.e.clientY + document.body.scrollTop;

    var w = (x - x_mouse),
    h = (y - y_mouse);

    if (!w || !h) {
        return false;
    }

    var square = fabric_canvas.getActiveObject();
    if (square.get('type') === "rect") {
        square.set('width', w).set('height', h);
        fabric_canvas.renderAll();
    }
}
function mu_Highlight(options) {
    if(started_mouse) {
        started_mouse = false;
    }

    var square = fabric_canvas.getActiveObject();
    fabric_canvas.renderAll();
    fabric_canvas.setActiveObject(square); 
}
function useHighlight(targetEl) {
    var highlightButton = document.getElementById(efb_panelHighlightButton);
    resetCommand();
    enableActionButtonStyle(targetEl);
    
    fabric_canvas.on("mouse:down", md_Highlight);
    fabric_canvas.on("mouse:move", mm_Highlight);
    fabric_canvas.on("mouse:up", mu_Highlight);
}


function md_Note(options) {
    var canCreate = true;
    if (options.target && options.target.get('type') === "i-text") {
        canCreate = false;
    }
    
    if (canCreate) {
        started_mouse = true;

        x_mouse = options.e.clientX;
        y_mouse = options.e.clientY + document.body.scrollTop;

        var text = new window.fabric.IText(iTextContent, {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 35,
            fill: "yellow",
            stroke: "black",
            strokeWidth: 1,
            left: x_mouse, 
            top: y_mouse
        });

        text.hasControls = false;
        text.set({
            borderColor: "red",
            editingBorderColor: "red",
            borderOpacityWhenMoving:1
        });

        fabric_canvas.add(text); 
        fabric_canvas.renderAll();
        fabric_canvas.setActiveObject(text);
        // auto select the current text
        text.enterEditing();
    }
}
function useNote(targetEl) {
    var noteButton = document.getElementById(efb_panelNoteButton);
    resetCommand();
    enableActionButtonStyle(targetEl);
    
    fabric_canvas.on("mouse:down", md_Note);
}

function iterate(obj) {
    var res = "";
    for (var property in obj) {
        if (typeof obj[property] === "object") {
            // Maximum call stack size exceeded
            //iterate(obj[property]);
        } else if (typeof obj[property] === "function") {
            // do nothing
        } else {
            res += property + " = " + obj[property] + "\n";
        }
    }
    return res;
}

// be careful : html2canvas.js must be included before !
function snapHTMLPage() {
    // remove feedback widget before screenshoting
    var feedback_panel = document.getElementById(efb_panelCssName);
    feedback_panel.style.display = "none";
    
    var overlay = document.getElementById(efb_overlay);
    var overlayColor = overlay.style.backgroundColor;
    overlay.style.backgroundColor = "transparent";
    
	window.html2canvas(document.body, {
        onrendered: function(canvas) {
            // TODO : do something more useful !
            // exclude the efb panel from snapshot !
            feedback_panel.style.display = "block";
            //overlay.style.display = "block";
            overlay.style.backgroundColor = overlayColor;
            //document.body.style.backgroundColor = bodyColor;
            
            // get all info. from the client browser
            var nav_data = iterate(navigator);
            
            // get current URL
            var url = document.URL;
            
            // retrieve comments
            var feedback_comments = document.getElementById(efb_panelComments).value;
            
            
            // finally, we will crop the canvas to only upload
            // relevant parts of the image
            /*var cropped_canvas = document.createElement("canvas");
            var context = cropped_canvas.getContext('2d');
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            
            context.drawImage(canvas,
                0,
                document.body.scrollTop,
                window.innerWidth,
                window.innerHeight,
                0,
                0,
                window.innerWidth,
                window.innerHeight);
            window.open(cropped_canvas.toDataURL("image/png"), "_self");*/
            window.open(canvas.toDataURL("image/png"), "_self");
            
        }
    });
}

function cancelFeedback() {
    toggleDisplayPanel();
}

function sendFeedback() {
    snapHTMLPage();
}

// expose to global namespace
window.toggleDisplayPanel = toggleDisplayPanel;
window.toggleMinimizePanel = toggleMinimizePanel;
window.usePen = usePen;
window.useHighlight = useHighlight;
window.useNote = useNote;
window.resetCommand = resetCommand;
window.cancelFeedback = cancelFeedback;
window.sendFeedback = sendFeedback;

window.addEventListener("load", function() {
    document.getElementsByTagName("head")[0].appendChild(efb_style);
    
    // "body" has two more children
    appendHtml(document.body, html); 
    
}, false);

})(window,document);
