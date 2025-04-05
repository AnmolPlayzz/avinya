import { data } from "./data.js";

const page = () => {
    return (
        <div>
            {data.map((item) => (
                <div key={item.id} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={item.image} alt="" style={{height: "100px"}} />
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.date}</p>
                        <p>Conducted By {item.conductedBy}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default page;
