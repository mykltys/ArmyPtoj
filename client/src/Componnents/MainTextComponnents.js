function MainTextComponnents(props){
    return(
        <div className='App-main-componnents'> 
            <p style={{margin:50}}> Altitude: {props.altitude}</p>
            <p style={{margin:50}}> His     : {props.his}     </p>
            <p style={{margin:50}}> Adi     : {props.adi}     </p>
        </div>
    );
}

export default MainTextComponnents;