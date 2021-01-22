import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let listOfEmotions = Object.entries(this.props.emotions.emotion);
        let emotionDetails = listOfEmotions.map((emotionDetail)=> {
            return <tr>
                <td >{emotionDetail[0]} </td>
                <td > {emotionDetail[1]} </td>
            </tr>
        });
      return (
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                emotionDetails
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }

}
export default EmotionTable;
