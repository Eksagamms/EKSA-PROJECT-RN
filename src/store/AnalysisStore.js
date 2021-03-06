import { observable, configure, action, runInAction, autorun } from 'mobx';
configure({ enforceActions: "observed" });
class AnalysisStore {

    @observable analysisHemogramData = [];
    @observable analysisIdrarData = [];
    @observable analysisHepatitData = [];
    @observable analysisAllData = [];
    @observable analysisSelectedSessionData = [];
<<<<<<< HEAD
    @observable compareAllData = [];
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    @observable dataState = true;

    constructor() {
        autorun(() => {
            this.start()
        });
    }

    start = async () => {
        this.cleanHemogramData();
        this.cleanHepatitData();
        this.cleanIdrarData();
        this.analysisData();
    }
    analysisData = async () => {
        try {
            let response = await fetch('https://www.matmaca.com/api/ocr/PatientAllOcrData?id=1');
            let json = await response.json();
            console.log(json);

            json.map(val=>{
                if (val.AnalysisTypeId == 1) {
                    this.pushHemogramData(val);
                }
                else if(val.AnalysisTypeId == 2)
                {
                    this.pushIdrarData(val);
                }
                else if(val.AnalysisTypeId == 3)
                {
                    this.pushHepatitData(val);
                }
            })
            

            this.changeAnalysisData(json);
            this.changeState();
        } catch (error) {
            console.error(error);
        }
    }

    analysisValues= async (sessionId) => {
        this.changeStateTrue();
        try {
            let response = await fetch('https://www.matmaca.com/api/ocr/PatientAllAnalysisValus?sessionId='+sessionId);
            let json = await response.json();
            console.log(json);

             this.changeAnalysisSelectedSessionData(json);
             this.changeState();
        } catch (error) {
            console.error(error);
        }
    }

<<<<<<< HEAD
    getCompareAnalysis= async () => {
        this.changeStateTrue();
        try {
            let response = await fetch('https://www.matmaca.com/api/ocr/CompareAnalysis');
            let json = await response.json();
            console.log(json);

             this.changeCompareData(json);
             this.changeState();
        } catch (error) {
            console.error(error);
        }
    }

=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    @action cleanAll = async () => {
        runInAction(() => {
                this.hospitalsData = [];
                this.changeState = false;
        });
    }
    @action changeState = () => {
        runInAction(() => { this.dataState = false });
    }
    @action changeStateTrue = () => {
        runInAction(() => { this.dataState = true });
    }
    @action changeAnalysisData = (data) => {
        runInAction(() => { this.analysisAllData = data });
    }
<<<<<<< HEAD
    @action changeCompareData = (data) => {
        runInAction(() => { this.compareAllData = data });
    }
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    @action changeAnalysisSelectedSessionData = (data) => {
        runInAction(() => { this.analysisSelectedSessionData = data });
    }
    @action pushHemogramData = (val) => {
        runInAction(() => { this.analysisHemogramData.push(val) });
    }
    @action pushIdrarData = (val) => {
        runInAction(() => { this.analysisIdrarData.push(val) });
    }
    @action pushHepatitData = (val) => {
        runInAction(() => { this.analysisHepatitData.push(val) });
    }
    @action cleanHemogramData = () => {
        runInAction(() => { this.analysisHemogramData = [] });
    }
    @action cleanIdrarData = () => {
        runInAction(() => { this.analysisIdrarData = [] });
    }
    @action cleanHepatitData = () => {
        runInAction(() => { this.analysisHepatitData = [] });
    }
<<<<<<< HEAD
    @action cleanCompareData = () => {
        runInAction(() => { this.compareAllData = [] });
    }
=======
>>>>>>> 1f7fefa0e988504b9ccb82c0b90b2ece1425fa7d
    
}
export default new AnalysisStore()