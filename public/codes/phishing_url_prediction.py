# importing needed libraries
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# loading dataset
dataset = pd.read_csv('data/phishing_site_urls.csv')
dataset.head(3)
dataset['Label'].unique()
dataset['Label'].replace({'good':0, 'bad':1}, inplace=True)
dataset['Label'].unique()

# differentiating the dataset
x = dataset['URL']
y = dataset['Label']

# spliting the dataset
x_train ,x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# vectorizing
feature_extraction = TfidfVectorizer(min_df=1)

# fit and transform
x_train_feature = feature_extraction.fit_transform(x_train)
x_test_feature = feature_extraction.transform(x_test)

# preparing the suitable model for trainning
phishing_model = LogisticRegression()

# fitting and trainning the model
phishing_model.fit(x_train_feature, y_train)

# predicting the data
y_pred = phishing_model.predict(x_test_feature)
print(classification_report(y_test, y_pred))
phishing_model.score(x_train_feature, y_train)*100, phishing_model.score(x_test_feature, y_test)*100
input = [dataset['URL'][1]]
print(input)
prediction = phishing_model.predict(feature_extraction.transform(input))
if prediction == 0:
    print('safe')
else:
    print('danger')