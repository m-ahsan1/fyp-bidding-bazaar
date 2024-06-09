from flask import Flask, request, jsonify
import cv2
from sklearn.preprocessing import LabelEncoder
from ultralytics import YOLO
import numpy as np
import pandas as pd
import json
from flask_cors import CORS
import xgboost as xgb
import pickle

app = Flask(__name__)
CORS(app)
model = YOLO('yolov8x.pt')
# Load the trained XGBoost model

# ---------------------- API for Data Cleaning --------------------------------------------------------------------------------
def cleandata():
    import pandas as pd


    # Replace 'file_path.csv' with the path to your CSV file
    file_path = 'pakwheeldataset.csv'

    # Read the CSV file into a DataFrame
    data = pd.read_csv(file_path)

    # Droping columns
    data = data.drop(columns=['Offer URL'])
    data = data.drop(columns=['Last Updated Date'])


    # Drop rows with null values in the 'AC/Heater' column
    data.dropna(subset=['AC/Heater'], inplace=True)
    data.dropna(subset=['Rating'], inplace=True)
    data.dropna(subset=['Exterior & Body'], inplace=True)
    data.dropna(subset=['Engine/Transmission/Clutch'], inplace=True)
    data.dropna(subset=['Suspension/Steering'], inplace=True)
    data.dropna(subset=['Interior'], inplace=True)
    data.dropna(subset=['Price'], inplace=True)
    data.dropna(subset=['Model Date'], inplace=True)
    data.dropna(subset=['Mileage'], inplace=True)
    data.dropna(subset=['Fuel Type'], inplace=True)



    # Replace '10-Oct' with '10'
    data['Rating'] = data['Rating'].replace('10-Oct', '10')

    # Replace missing values in 'Transmission' column with 'Manual'
    data['Transmission'] = data['Transmission'].fillna('Manual')

    # Replace missing values in 'Transmission' column with 'Manual'
    data['Fuel Type'] = data['Fuel Type'].fillna('Electric')

    # Remove 'PKR' and 'lacs'/'crore', then convert to numerical form
    data['Price'] = data['Price'].str.replace('PKR', '').str.replace(' lacs', 'e4').str.replace(' crore', 'e7').astype(float)

    # Remove ' km' from 'Mileage' column
    data['Mileage'] = data['Mileage'].str.replace(' km', '').str.replace(',', '').astype(int)

    # Remove '%' from 'Interior' column
    data['Interior'] = data['Interior'].str.replace('%', '').str.replace(',', '').astype(int)

    # Remove '%' from 'Suspension/Steering' column
    data['Suspension/Steering'] = data['Suspension/Steering'].str.replace('%', '').str.replace(',', '').astype(int)

    # Remove '%' from 'Engine/Transmission/Clutch' column
    data['Engine/Transmission/Clutch'] = data['Engine/Transmission/Clutch'].str.replace('%', '').str.replace(',', '').astype(int)

    # Remove '%' from 'Exterior & Body' column
    data['Exterior & Body'] = data['Exterior & Body'].str.replace('%', '').str.replace(',', '').astype(int)

    # Remove '%' from 'AC/Heater' column
    data['AC/Heater'] = data['AC/Heater'].str.replace('%', '').str.replace(',', '').astype(int)

    # Remove forward slash and data after it from 'Rating' column
    data['Rating'] = data['Rating'].str.split('/').str[0]

    # Create a new column 'Company' containing the first word of 'Car Name'
    data['Company'] = data['Car Name'].str.split().str[0]

    # Create a new column 'Variant' containing data from 'Car Name' without first and last words
    data['Variant'] = data['Car Name'].str.split().apply(lambda x: ' '.join(x[1:]))

    # Droping columns
    #data = data.drop(columns=['Car Name'])
    data['Car Name'] = data['Car Name'] +','+data['Fuel Type']+ ','+data['Transmission']+ ',' + data['Model Date'].astype(int).astype(str)

    # Apply a mapping function to convert 'Manual' to 0 and other values to 1
    data['Transmission'] = data['Transmission'].map(lambda x: 0 if x == 'Manual' else 1)


    #Convert 'Rating' column to numeric
    data['Rating'] = pd.to_numeric(data['Rating'], errors='coerce')

    #Data type changed of Model Date to int
    data['Model Date'] = data['Model Date'].astype(int)

    #Data type changed of Price to int
    data['Price'] = data['Price'].astype(int)

    #------------------
    # Perform one-hot encoding

    encoder = LabelEncoder()

    #Creating dictionaries---
    encoded_values = encoder.fit_transform(data['Company'])

    # Create a dictionary with original values as keys and encoded values as values
    companydic = dict(zip(data['Company'], encoded_values))
    print(companydic)

    encoded_values = encoder.fit_transform(data['Variant'])

    # Create a dictionary with original values as keys and encoded values as values
    varientdic = dict(zip(data['Variant'], encoded_values))
    print(varientdic)

    #encoded_values = encoder.fit_transform(data['Model Date'])

    # Create a dictionary with original values as keys and encoded values as values
    #modeldic = dict(zip(data['Model Date'], encoded_values))
    #print(modeldic)

    encoded_values = encoder.fit_transform(data['Fuel Type'])

    # Create a dictionary with original values as keys and encoded values as values
    fueldic = dict(zip(data['Fuel Type'], encoded_values))
    print(fueldic)

    #--------------------------

    data['Company'] = encoder.fit_transform(data['Company'])
    data['Variant'] = encoder.fit_transform(data['Variant'])
    #data['Model Date'] = encoder.fit_transform(data['Model Date'])
    data['Fuel Type'] = encoder.fit_transform(data['Fuel Type'])
    data['Rating'] = data['Rating'] * 10
    data['Rating'] = data['Rating'].astype(int)
    value_counts = data['Variant'].value_counts()
    # Get unique values that occur more than once
    duplicate_values = value_counts[value_counts > 5].index.tolist()
    # Remove rows with unique values in column 'A'
    data = data[data['Variant'].isin(duplicate_values)]
    value_counts = data['Company'].value_counts()
    # Get unique values that occur more than once
    duplicate_values = value_counts[value_counts > 5].index.tolist()
    # Remove rows with unique values in column 'A'
    data = data[data['Company'].isin(duplicate_values)]



    data.columns = map(str.lower, data.columns)

    #------------------


    # Display the first few rows of the DataFrame
    print(data.info())


    # Save cleaned data to a separate file
    data.to_csv('cleaned_data.csv', index=False)

    return companydic,varientdic,fueldic

# ---------------------- Function for AI Model --------------------------------------------------------------------------------
def predict_price(input_data, model_path='xgb_regressor_model.pkl'):
    # Load the trained XGBoost model
    with open(model_path, 'rb') as model_file:
        xgb_regressor = pickle.load(model_file)

    # Prepare input data into DataFrame
    input_df = pd.DataFrame(input_data, index=[0])

    # Make predictions on the input data
    predicted_price = xgb_regressor.predict(input_df)

    # Ensure predicted price is non-negative
    predicted_price = max(0, predicted_price[0])

    return predicted_price

# ---------------------- API for price prediction --------------------------------------------------------------------------------
@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Accessing the JSON string from query parameters
        json_str = request.args.get('formData')
        if json_str:
            # Converting the JSON string to a dictionary
            form_data = json.loads(json_str)
        else:
            form_data = {}

        # Extracting individual parameters from the form_data dictionary
        rating = form_data.get('rating')
        exterior = form_data.get('exterior')
        engine = form_data.get('engine')
        suspension = form_data.get('suspension')
        interior = form_data.get('interior')
        heater = form_data.get('heater')
        mileage = form_data.get('mileage')
        company = form_data.get('company')

        # Extract company details
        parts = company.split(',')

        if len(parts) != 4:
            raise ValueError("Company field must have exactly 4 parts separated by commas",parts)

        # Extract the individual components
        companyname = parts[0].split()[0]
        variant = ' '.join(parts[0].split()[1:])
        fuel = parts[1]
        transmission = parts[2]
        modelyear = int(parts[3])

        if transmission == 'Manual':
            transmission = 0
        else:
            transmission = 1
        
        #companydic,varientdic,fueldic = cleandata()
        #companydic_str = {key: str(value) for key, value in companydic.items()}
        #varientdic_str = {key: str(value) for key, value in varientdic.items()}
        #fueldic_str = {key: str(value) for key, value in fueldic.items()}
        fueldic={"Diesel": "0","Hybrid": "1","Petrol": "2"}
        varientdic_str= {"2008 Active":"0","2008 Active 2022":"1","2008 Active 2023":"2","2008 Allure":"3","2008 Allure 2022":"4","2008 Allure 2023":"5","7 Series 740 Le xDrive":"6","7 Series ActiveHybrid 7":"7","A4 1.4 TFSI":"8","A4 1.4 TFSI 2019":"9","A4 1.8 TFSI":"10","A5 S-Line Competition":"11","A6 1.8 TFSI":"12","Alsvin 1.5L DCT Comfort":"13","Alsvin 1.5L DCT Comfort 2022":"14","Alsvin 1.5L DCT Lumiere":"15","Alsvin 1.5L DCT Lumiere 2021":"16","Alsvin 1.5L DCT Lumiere 2022":"17","Alto L":"18","Alto L 2019":"19","Alto L 2020":"20","Alto L 2021":"21","Alto L limited 40th anniversary edition":"22","Alto L limited 40th anniversary edition 2020":"23","Alto VX":"24","Alto VXL AGS":"25","Alto VXL AGS 2019":"26","Alto VXL AGS 2022":"27","Alto VXL AGS 2023":"28","Alto VXR":"29","Alto VXR 2012":"30","Alto VXR 2021":"31","Alto VXR 2023":"32","Alto VXR AGS":"33","Alto X":"34","Alto works edition":"35","Aqua G":"36","Aqua G 2018":"37","Aqua L 2020":"38","Aqua S":"39","BJ40 Exclusive 2022":"40","BR-V i-VTEC S":"41","BR-V i-VTEC S 2020":"42","BR-V i-VTEC S 2021":"43","BR-V i-VTEC S 2022":"44","Benz C Class C180":"45","Benz C Class C180 Avantgarde":"46","Benz CLA Class CLA200":"47","Benz E Class E 180 Exclusive":"48","Benz E Class E 180 Exclusive 2020":"49","Benz E Class E200":"50","Benz SLK Class SLK200":"51","Boon":"52","Boon Cilq":"53","Boon X SA 2":"54","Boon X SA 2 2021":"55","C-HR":"56","C-HR 1.2 Turbo":"57","C-HR 1.2 Turbo 2018":"58","C-HR G":"59","C-HR G 2017":"60","C-HR G 2018":"61","C-HR G-LED":"62","C-HR G-LED 2018":"63","C-HR S":"64","C-HR S-LED":"65","Camry Hybrid":"66","Camry Hybrid 2015":"67","Cast Sport Turbo SA III":"68","Cayenne Hybrid":"69","Cayenne Hybrid 2013":"70","Cayenne Hybrid 2014":"71","Challenger R/T":"72","Ciaz Automatic 2019":"73","City 1.2L CVT":"74","City 1.2L CVT 2021":"75","City 1.2L CVT 2023":"76","City 1.2L M/T":"77","City 1.2L M/T 2021":"78","City 1.3 i-VTEC":"79","City 1.3 i-VTEC 2021":"80","City 1.3 i-VTEC Prosmatec":"81","City 1.3 i-VTEC Prosmatec 2021":"82","City 1.5L ASPIRE CVT":"83","City 1.5L ASPIRE CVT 2021":"84","City 1.5L ASPIRE CVT 2022":"85","City 1.5L ASPIRE CVT 2023":"86","City 1.5L ASPIRE M/T":"87","City 1.5L ASPIRE M/T 2022":"88","City 1.5L CVT":"89","City 1.5L CVT 2021":"90","City 1.5L CVT 2022":"91","City Aspire 1.5 i-VTEC":"92","City Aspire Prosmatec 1.5 i-VTEC":"93","City Aspire Prosmatec 1.5 i-VTEC 2019":"94","City Aspire Prosmatec 1.5 i-VTEC 2020":"95","City Aspire Prosmatec 1.5 i-VTEC 2021":"96","Civic 1.5 RS Turbo":"97","Civic 1.5 RS Turbo 2021":"98","Civic 1.5 VTEC Turbo Oriel":"99","Civic 1.5 VTEC Turbo Oriel 2021":"100","Civic 1.8 i-VTEC CVT":"101","Civic 1.8 i-VTEC CVT 2017":"102","Civic 1.8 i-VTEC CVT 2020":"103","Civic 1.8 i-VTEC CVT 2021":"104","Civic MX (Hybrid)":"105","Civic MX (Hybrid) 2006":"106","Civic Oriel":"107","Civic Oriel 1.8 i-VTEC CVT":"108","Civic Oriel 1.8 i-VTEC CVT 2017":"109","Civic Oriel 1.8 i-VTEC CVT 2018":"110","Civic Oriel 1.8 i-VTEC CVT 2019":"111","Civic Oriel 1.8 i-VTEC CVT 2020":"112","Civic Oriel 1.8 i-VTEC CVT 2021":"113","Civic Oriel 2022":"114","Civic RS":"115","Civic RS 2022":"116","Civic RS 2023":"117","Civic Turbo 1.5 VTEC CVT":"118","Civic Turbo 1.5 VTEC CVT 2016":"119","Civic VTi Prosmatec 1.8 i-VTEC":"120","Clipper":"121","Clipper DX":"122","Corolla":"123","Corolla 2020":"124","Corolla Altis 1.6 X CVT-i":"125","Corolla Altis 1.6 X CVT-i 2023":"126","Corolla Altis 1.6 X CVT-i Special Edition":"127","Corolla Altis 1.6 X CVT-i Special Edition 2022":"128","Corolla Altis 1.8":"129","Corolla Altis 1.8 2018":"130","Corolla Altis Automatic 1.6":"131","Corolla Altis Automatic 1.6 2018":"132","Corolla Altis CVT-i 1.8":"133","Corolla Altis Grande 1.8":"134","Corolla Altis Grande CVT-i 1.8":"135","Corolla Altis Grande CVT-i 1.8 2016":"136","Corolla Altis Grande CVT-i 1.8 2019":"137","Corolla Altis Grande X CVT-i 1.8 Beige Interior":"138","Corolla Altis Grande X CVT-i 1.8 Beige Interior 2022":"139","Corolla Altis Grande X CVT-i 1.8 Black Interior":"140","Corolla Altis Grande X CVT-i 1.8 Black Interior 2022":"141","Corolla Altis Grande X CVT-i 1.8 Black Interior 2023":"142","Corolla Altis X Automatic 1.6":"143","Corolla Altis X Automatic 1.6 2021":"144","Corolla Altis X Automatic 1.6 2022":"145","Corolla Altis X Automatic 1.6 Special Edition":"146","Corolla Altis X Automatic 1.6 Special Edition 2022":"147","Corolla Altis X CVT-i 1.8":"148","Corolla Altis X CVT-i 1.8 2021":"149","Corolla Altis X Manual 1.6":"150","Corolla Altis X Manual 1.6 2021":"151","Corolla Axio":"152","Corolla Axio G":"153","Corolla GLi 1.3 VVTi":"154","Corolla GLi 1.3 VVTi 2015":"155","Corolla GLi 1.3 VVTi Special Edition":"156","Corolla GLi 1.3 VVTi Special Edition 2018":"157","Corolla GLi Automatic 1.3 VVTi":"158","Corolla GLi Automatic 1.3 VVTi 2017":"159","Corolla GLi Automatic 1.3 VVTi 2018":"160","Corolla GLi Automatic 1.3 VVTi 2019":"161","Corolla XLi Automatic":"162","Corolla XLi Automatic 2019":"163","Corolla XLi VVTi":"164","Corolla XLi VVTi 2019":"165","Crown RS Advance":"166","Cultus Auto Gear Shift":"167","Cultus Auto Gear Shift 2019":"168","Cultus Auto Gear Shift 2020":"169","Cultus Auto Gear Shift 2022":"170","Cultus VXL":"171","Cultus VXL 2018":"172","Cultus VXL 2021":"173","Cultus VXR":"174","Cultus VXR 2021":"175","Cultus VXR 2022":"176","D-Max V-Cross Automatic 3.0":"177","D-Max V-Cross Automatic 3.0 2020":"178","Dayz 2022":"179","Dayz Bolero X":"180","Dayz Highway Star":"181","Dayz Highway star G":"182","Dayz Highway star G 2021":"183","Dayz Highway star X 2022":"184","Dayz X":"185","Dayz X 2023":"186","EK Space Custom":"187","Elantra":"188","Elantra GL":"189","Elantra GL 2023":"190","Elantra GLS":"191","Elantra GLS 2022":"192","Elantra GLS 2023":"193","Esquire Gi":"194","Every Join":"195","Every PC":"196","Every PC 2019":"197","Every Wagon":"198","F 150 Raptor 5.0L":"199","F 150 Raptor 5.0L 2018":"200","Fit 1.5 Hybrid S Package":"201","Fit 1.5 Hybrid S Package 2020":"202","Flair XG":"203","Flair XG 2018":"204","Flair XG 2020":"205","Fortuner 2.7 G":"206","Fortuner 2.7 G 2021":"207","Fortuner 2.7 G 2022":"208","Fortuner 2.7 V":"209","Fortuner 2.7 V 2021":"210","Fortuner 2.7 VVTi":"211","Fortuner 2.7 VVTi 2017":"212","Fortuner 2.7 VVTi 2018":"213","Fortuner 2.7 VVTi 2019":"214","Fortuner 2.8 Sigma 4":"215","Fortuner 2.8 Sigma 4 2019":"216","Fortuner 2.8 Sigma 4 2021":"217","Fortuner 2.8 Sigma 4 2022":"218","Fortuner Legender":"219","Freed + Hybrid G Honda Sensing 2018":"220","Glory 580 1.5 CVT":"221","Glory 580 Pro":"222","Glory 580 Pro 2021":"223","Glory 580 Pro 2023":"224","Grand Carnival":"225","Grand Carnival EX":"226","Grand Carnival EX 2018":"227","Grand Carnival EX+":"228","Grand Carnival Executive":"229","Grand Carnival GLS+":"230","Grand Carnival GLS+ 2021":"231","H6 2.0T AWD":"232","H6 2.0T AWD 2023":"233","HR-V VTi-S":"234","HR-V VTi-S 2022":"235","HR-V VTi-S 2023":"236","HS 1.5 Turbo":"237","HS 1.5 Turbo 2021":"238","HS Essence":"239","HS Essence 2023":"240","HS PHEV":"241","HS PHEV 2022":"242","HS Trophy":"243","HS Trophy 2021":"244","HS Trophy 2022":"245","Hijet Special":"246","Hilux Revo G Automatic 2.8 2020":"247","Hilux Revo GR-S":"248","Hilux Revo GR-S 2023":"249","Hilux Revo Rocco":"250","Hilux Revo Rocco 2022":"251","Hilux Revo V Automatic 2.8":"252","Hilux Revo V Automatic 2.8 2021":"253","Hilux Revo V Automatic 2.8 2022":"254","Hustler G":"255","Insight EX":"256","Insight EX 2019":"257","Insight EX 2021":"258","Insight EX Black Style":"259","Jimny":"260","Jimny JLDX":"261","Jolion Top":"262","Karvaan Base Model 1.0":"263","Karvaan Base Model 1.0 2021":"264","Karvaan Plus":"265","Karvaan Plus 2021":"266","Karvaan Plus 2022":"267","Karvaan Plus 2023":"268","Land Cruiser":"269","Land Cruiser 2004":"270","Land Cruiser 2018":"271","Land Cruiser AX":"272","Land Cruiser AX 2018":"273","Land Cruiser AX G Selection":"274","Land Cruiser AX G Selection 2019":"275","Land Cruiser Cygnus":"276","Land Cruiser ZX":"277","Land Cruiser ZX 2017":"278","Land Cruiser ZX Gasoline 3.5L":"279","Land Cruiser ZX Gasoline 3.5L 2022":"280","Land Cruiser ZX Gasoline 3.5L 2023":"281","Mira B":"282","Mira G SA III":"283","Mira G SA III 2017":"284","Mira L":"285","Mira L 2019":"286","Mira L 2020":"287","Mira L 2022":"288","Mira LSA 3":"289","Mira LSA 3 2018":"290","Mira LSA 3 2020":"291","Mira LSA 3 2021":"292","Mira X":"293","Mira X 2019":"294","Mira X 2020":"295","Mira X 2023":"296","Mira X SA lll":"297","Mira X SA lll 2020":"298","Mira X SA lll 2022":"299","Move L SA 3":"300","Move L SA 3 2020":"301","Move X SA 2":"302","Move X SA 2 2020":"303","N Box Custom GL":"304","N Box Custom GL 2020":"305","N Box Slash G":"306","N Wgn":"307","N Wgn 2021":"308","N Wgn G":"309","N Wgn G 2020":"310","Note 1.2E":"311","Note 1.2E 2020":"312","Oshan X7 Comfort":"313","Oshan X7 Comfort 2022":"314","Oshan X7 FutureSense":"315","Oshan X7 FutureSense 2022":"316","Oshan X7 FutureSense 2023":"317","Passo Moda G":"318","Passo X":"319","Passo X L Package S":"320","Passo X L Package S 2019":"321","Passo X L Package S 2020":"322","Passo X S":"323","Passo X S 2020":"324","Pearl MT":"325","Pearl MT 2023":"326","Picanto 1.0 AT":"327","Picanto 1.0 AT 2020":"328","Picanto 1.0 AT 2021":"329","Picanto 1.0 AT 2022":"330","Picanto 1.0 AT 2023":"331","Picanto 1.0 MT":"332","Picanto 1.0 MT 2023":"333","Pixis Epoch":"334","Pixis Epoch 2019":"335","Pixis Epoch L":"336","Prado":"337","Prado TX 2.7":"338","Prado TX 2.7 2015":"339","Prado TX 2.7 2018":"340","Prado TX L Package 2.7":"341","Prado TX L Package 2.7 2013":"342","Prado TX L Package 2.7 2018":"343","Prado TX L Package 2.7 2019":"344","Prado TX Limited 2.7":"345","Prado TX Limited 2.7 2016":"346","Prado TX Limited 2.7 2018":"347","Prado TX Limited 2.7 2019":"348","Prado TX Limited 3.0D":"349","Prado TX Limited 3.0D 2007":"350","Premio F 1.5":"351","Prius A Premium Touring Selection":"352","Prius A Premium Touring Selection 2020":"353","Prius A Touring Selection":"354","Prius A Touring Selection 2020":"355","Prius PHV (Plug In Hybrid)":"356","Prius S Touring Selection 2020":"357","Q7 3.0 TFSI":"358","Q7 45 TFSI Quattro":"359","Raize":"360","Raize 2022":"361","Raize Z":"362","Raize Z 2019":"363","Raize Z 2020":"364","Rocky 1.0 R TC":"365","Rocky G":"366","Roomy XS":"367","Roomy XS 2020":"368","Roox S Hybrid":"369","Rover Vogue P400e":"370","Rover Vogue P400e 2019":"371","Rush G A/T":"372","Saga 1.3L Ace A/T":"373","Saga 1.3L Ace A/T 2022":"374","Saga 1.3L Ace A/T 2023":"375","Saga 1.3L R3 A/T":"376","Saga 1.3L Standard A/T":"377","Saga 1.3L Standard A/T 2023":"378","Saga 1.3L Standard M/T":"379","Santa Fe Signature":"380","Santa Fe Signature 2023":"381","Scrum":"382","Scrum 2018":"383","Scrum 2019":"384","Serena":"385","Sienta G":"386","Sienta G 2018":"387","Sonata 2.0":"388","Sonata 2.0 2021":"389","Sonata 2.0 2022":"390","Sonata 2.0 2023":"391","Sonata 2.5":"392","Sonata 2.5 2021":"393","Sonata 2.5 2022":"394","Sonata 2.5 2023":"395","Sorento 2.4 AWD":"396","Sorento 2.4 FWD":"397","Sorento 2.4 FWD 2021":"398","Sorento 2.4 FWD 2022":"399","Sorento 3.5 FWD":"400","Sorento 3.5 FWD 2022":"401","Spacia X":"402","Spacia X 2020":"403","Sportage AWD":"404","Sportage AWD 2019":"405","Sportage AWD 2020":"406","Sportage AWD 2021":"407","Sportage AWD 2022":"408","Sportage AWD 2023":"409","Sportage Alpha":"410","Sportage Alpha 2022":"411","Sportage Alpha 2023":"412","Sportage FWD":"413","Sportage FWD 2019":"414","Sportage FWD 2020":"415","Sportage FWD 2021":"416","Sportage FWD 2022":"417","Sportage FWD 2023":"418","Stella L":"419","Stella L 2022":"420","Stonic":"421","Stonic EX+":"422","Stonic EX+ 2021":"423","Stonic EX+ 2022":"424","Swift DLX 1.3":"425","Swift DLX 1.3 Navigation":"426","Swift DLX Automatic 1.3 Navigation":"427","Swift GL CVT":"428","Swift GL CVT 2022":"429","Swift GL CVT Limited Edition":"430","Swift GL Manual":"431","Swift GL Manual 2022":"432","Swift GLX CVT":"433","Swift GLX CVT 2022":"434","Swift GLX CVT 2023":"435","Taft 2020":"436","Tiggo 4 Pro DEX Plus 1.5T":"437","Tiggo 4 Pro DEX Plus 1.5T 2023":"438","Tiggo 8 Pro 1.6 DEX Plus":"439","Tiggo 8 Pro 1.6 DEX Plus 2022":"440","Tiggo 8 Pro 1.6 DEX Plus 2023":"441","Tucson AWD A/T Ultimate":"442","Tucson AWD A/T Ultimate 2020":"443","Tucson AWD A/T Ultimate 2021":"444","Tucson AWD A/T Ultimate 2022":"445","Tucson AWD A/T Ultimate 2023":"446","Tucson FWD A/T GLS":"447","Tucson FWD A/T GLS Sport":"448","Tucson FWD A/T GLS Sport 2022":"449","V2 VCT-i":"450","Vezel Hybrid RS Honda Sensing":"451","Vezel Hybrid RS Honda Sensing 2016":"452","Vezel Hybrid RS Honda Sensing 2018":"453","Vezel Hybrid Z":"454","Vezel Hybrid Z 2016":"455","Vezel Hybrid Z Honda Sensing":"456","Vezel Hybrid Z Honda Sensing 2018":"457","Vezel Hybrid Z Honda Sensing 2019":"458","Vezel e-HEV Play":"459","Vezel e-HEV Play 2021":"460","Vezel e-HEV Z":"461","Vezel e-HEV Z 2021":"462","Vitara GL+ 1.6":"463","Vitara GL+ 1.6 2018":"464","Vitz F 1.0":"465","Vitz F 1.0 2018":"466","Vitz F 1.0 2019":"467","Vitz F M Package 1.0":"468","Vitz F M Package 1.0 2018":"469","Voxy X 2018":"470","Wagon R":"471","Wagon R 2022":"472","Wagon R AGS":"473","Wagon R AGS 2021":"474","Wagon R AGS 2023":"475","Wagon R Hybrid FX":"476","Wagon R Hybrid FX 2018":"477","Wagon R Hybrid FX 2020":"478","Wagon R Hybrid FX 2022":"479","Wagon R Stingray Hybrid X":"480","Wagon R VXL":"481","Wagon R VXL 2018":"482","Wagon R VXL 2019":"483","Wagon R VXL 2022":"484","Wagon R VXL 2023":"485","Wagon R VXR":"486","Wagon R VXR 2023":"487","X1 sDrive18i":"488","X70 Executive AWD":"489","X70 Executive AWD 2021":"490","X70 Premium FWD":"491","X70 Premium FWD 2022":"492","Xbee":"493","Yaris":"494","Yaris ATIV CVT 1.3":"495","Yaris ATIV CVT 1.3 2021":"496","Yaris ATIV CVT 1.3 2023":"497","Yaris ATIV MT 1.3":"498","Yaris ATIV MT 1.3 2022":"499","Yaris ATIV X CVT 1.5":"500","Yaris ATIV X CVT 1.5 2020":"501","Yaris ATIV X CVT 1.5 2021":"502","Yaris ATIV X CVT 1.5 2022":"503","Yaris Cross Hybrid Z":"504","Yaris GLI CVT 1.3":"505","Yaris GLI MT 1.3":"506","Yaris GLI MT 1.3 2021":"507","Yaris GLI MT 1.3 2022":"508","Yaris Hatchback":"509","Yaris Hatchback 2020":"510","Yaris Hatchback G 1.0":"511","Yaris Hatchback G 1.0 2020":"512","ZS 1.5L":"513","ZS 1.5L 2021":"514"}
        companydic_str={"Audi":"0","BAIC":"1","BMW":"2","Changan":"3","Chery":"4","DFSK":"5","Daihatsu":"6","Dodge":"7","FAW":"8","Ford":"9","Haval":"10","Honda":"11","Hyundai":"12","Isuzu":"13","KIA":"14","MG":"15","Mazda":"16","Mercedes":"17","Mitsubishi":"18","Nissan":"19","Peugeot":"20","Porsche":"21","Prince":"22","Proton":"23","Range":"24","Subaru":"25","Suzuki":"26","Toyota":"27"}


        # Creating a response dictionary with the extracted elements
        data = {
    'rating': rating,
    'exterior & body': exterior,
    'engine/transmission/clutch': engine,
    'suspension/steering': suspension,
    'interior': interior,
    'ac/heater': heater,
    'company': int(companydic_str[companyname]),
    'variant': int(varientdic_str[variant]),
    'fuel type': int(fueldic[fuel]),
    'model date': modelyear,
    'mileage': mileage
}




        # Call the function to get the predicted price
        predicted_price = predict_price(data)

        return jsonify({'prediction':str(predicted_price)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# --------------------------------------------- API for dropdown -----------------------------------------------------------
@app.route('/dropdown')
def dropdown():
    try:
        with open('uniquecars.txt', 'r') as file:
            unique_cars_str = file.read().strip()
            unique_cars_dict = json.loads(unique_cars_str)
            return jsonify(unique_cars_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ----------------------- Get Unique cars only use this api when needed ------------------------------------------------------

@app.route('/unique-cars', methods=['GET'])
def get_unique_cars():
    try:
        # Read the CSV file
        df = pd.read_csv('cleaned_data.csv')
        
        # Ensure the 'car name' column exists
        if "car name" not in df.columns:
            return jsonify({"error": "The car name column is not present in the CSV file."}), 400
        
        # Extract unique values from the 'car' column
        unique_cars = sorted(df["car name"].dropna().unique().tolist())
        
        # Return the unique values as a JSON response
        return jsonify({"unique_cars": unique_cars})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------- Image detection -------------------------------------------------------------------------------------

@app.route('/detect_car', methods=['POST'])
def detect_car():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    np_img = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    
    results = model(np_img)
    boxes = results.xyxy[0]  # Accessing the bounding boxes directly
    
    car_detected = any(class_name in ['car', 'truck'] and confidence >= 0.7
                        for _, _, _, _, confidence, class_name in boxes)

    if car_detected:
        return jsonify({'message': 'A car is detected in the image.'})
    else:
        return jsonify({'message': 'A car is not detected in the image.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
