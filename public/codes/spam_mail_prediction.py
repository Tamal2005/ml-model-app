# importing needed libraries
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# loading dataset
dataset = pd.read_csv('data/mail_data.csv')
dataset.head(3)
dataset.info()
dataset.shape
dataset.where((pd.notnull(dataset)), '')
dataset.info()
dataset.loc[dataset['Category'] == 'spam', 'Category',] = 0
dataset.loc[dataset['Category'] == 'ham', 'Category',] = 1
dataset.head(7)
dataset['Message'][1]

# differentiating the dataset
x = dataset['Message']
y = dataset['Category']

# spliting the dataset
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# vectorizing
feature_extraction = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)

# fit and transform
x_train_feature = feature_extraction.fit_transform(x_train)
x_test_feature = feature_extraction.transform(x_test)
y_train_feature = y_train.astype('int')
y_test_feature = y_test.astype('int')

# preparing the suitable model for trainning
lr = LogisticRegression()

# fitting and trainning the model
lr.fit(x_train_feature, y_train_feature)
lr.score(x_test_feature, y_test_feature)*100, lr.score(x_train_feature, y_train_feature)*100
accuracy_score(y_train_feature, lr.predict(x_train_feature))
accuracy_score(y_test_feature, lr.predict(x_test_feature))

# predicting the data
input_mail = ['ur debit card expired please click on the given link below to renew it']
print(input_mail)
if lr.predict(feature_extraction.transform(input_mail)) == 0:
    print('spam mail')
else:
    print('not spam')