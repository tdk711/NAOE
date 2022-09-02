# Importing Libraries
import pandas as pd 
import numpy as np
import random as rd
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import RepeatedKFold
from sklearn.model_selection import cross_val_score
from sklearn.metrics import classification_report, precision_score, accuracy_score, recall_score, f1_score, confusion_matrix
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from sklearn.tree import DecisionTreeRegressor


# Loading CSV
trainX_df = pd.read_csv("dataset/train_x1.csv")
trainY_df = pd.read_csv("dataset/train_y1.csv")
testX_df = pd.read_csv("dataset/test_x1.csv")


# Filling Null Values
trainX_df.Expense.fillna(trainX_df.Expense.mode()[0], inplace = True)
trainX_df.Income.fillna(trainX_df.Income.mode()[0], inplace = True)
trainX_df['Loan type'].fillna(trainX_df['Loan type'].mode()[0], inplace = True)
trainX_df['Occupation type'].fillna(trainX_df['Occupation type'].mode()[0], inplace = True)
trainX_df.Age.fillna(trainX_df.Age.mode()[0], inplace = True)
trainX_df.Score1.fillna(trainX_df.Score1.mode()[0], inplace = True)
trainX_df.Score2.fillna(trainX_df.Score2.mode()[0], inplace = True)
trainX_df.Score3.fillna(trainX_df.Score3.mode()[0], inplace = True)
trainX_df.Score4.fillna(trainX_df.Score4.mode()[0], inplace = True)
trainX_df.Score5.fillna(trainX_df.Score5.mode()[0], inplace = True)
trainY_df.Label.fillna(trainY_df.Label.mode()[0], inplace = True)


# Replacing Qualitative Values
trainX_df['Loan type'].replace(['A', 'B'], [0, 1], inplace = True)
trainX_df['Occupation type'].replace(['X', 'Y', 'Z'], [0, 1, 2], inplace = True)

testX_df['Loan type'].replace(['A', 'B'], [0, 1], inplace = True)
testX_df['Occupation type'].replace(['X', 'Y', 'Z'], [0, 1, 2], inplace = True)


# Splitting into Test and Training Sets
X = trainX_df.drop('"ID"', axis = 1)
y = trainY_df.drop('"ID"', axis = 1)
y = np.ravel(y)
test_X = testX_df.drop('"ID_Test"', axis = 1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 42, stratify = y)


# Feature Scaling
scaler = StandardScaler()

scaler.fit(X_train)
X_train = scaler.transform(X_train)

scaler.fit(X_test)
X_test = scaler.transform(X_test)

scaler.fit(test_X)
test_X = scaler.transform(test_X)

scaler.fit(X)
X = scaler.transform(X)


# Decision Tree
dtree = DecisionTreeRegressor()
dtree.fit(X_train, y_train)
labels = dtree.predict(X_test)

print("Decision Tree:")

cv = RepeatedKFold(n_splits = 10, n_repeats = 5, random_state = rd.seed())
scores = cross_val_score(dtree, X_train, y_train, scoring = 'accuracy', cv = cv, n_jobs = -1)
print("Accuracy: %.4f" % (np.mean(scores)))

print(f"Precision: {round(precision_score(y_test, labels), 4)}")
print(f"Recall: {round(recall_score(y_test, labels), 4)}")
print(f"F1_score: {round(f1_score(y_test, labels), 4)}")


# Random Forest
rf = RandomForestClassifier(n_estimators = 200, max_depth = 10)
rf.fit(X_train, y_train)
labels = rf.predict(X_test)

print("\nRandom Forest:")

cv = RepeatedKFold(n_splits = 10, n_repeats = 5, random_state = rd.seed())
scores = cross_val_score(rf, X_train, y_train, scoring = 'accuracy', cv = cv, n_jobs = -1)
print("Accuracy: %.4f" % (np.mean(scores)))

print(f"Precision: {round(precision_score(y_test, labels), 4)}")
print(f"Recall: {round(recall_score(y_test, labels), 4)}")
print(f"F1_score: {round(f1_score(y_test, labels), 4)}")



# Logistic Regression
log = LogisticRegression(solver = 'liblinear', penalty = 'l1', C = 1.5)
log.fit(X_train, y_train)
labels = log.predict(X_test)

print("\nLogistic Regression:")

cv = RepeatedKFold(n_splits = 10, n_repeats = 5, random_state = rd.seed())
scores = cross_val_score(log, X_train, y_train, scoring = 'accuracy', cv = cv, n_jobs = -1)
print("Accuracy: %.4f" % (np.mean(scores)))
 
print(f"Precision: {round(precision_score(y_test, labels), 4)}")
print(f"Recall: {round(recall_score(y_test, labels), 4)}")
print(f"F1_score: {round(f1_score(y_test, labels), 4)}")


# KNN 
knn = KNeighborsClassifier(n_neighbors = 14)
knn.fit(X_train, y_train)
labels = knn.predict(X_test)

print("\nKNN Classification:")

cv = RepeatedKFold(n_splits = 10, n_repeats = 5, random_state = rd.seed())
scores = cross_val_score(knn, X_train, y_train, scoring = 'accuracy', cv = cv, n_jobs = -1)
print("Accuracy: %.4f" % (np.mean(scores)))

print(f"Precision: {round(precision_score(y_test, labels), 4)}")
print(f"Recall: {round(recall_score(y_test, labels), 4)}")
print(f"F1_score: {round(f1_score(y_test, labels), 4)}")


# Gradient Boosting
xgb = XGBClassifier(verbosity = 0, use_label_encoder = False, objective = 'binary:logistic', booster = 'gbtree' )
xgb.fit(X_train, y_train)
labels = xgb.predict(X_test)
labels = [round(value) for value in labels]

print("\nXGBoost:")
cv = RepeatedKFold(n_splits = 10, n_repeats = 5, random_state = rd.seed())
scores = cross_val_score(xgb, X_train, y_train, scoring = 'accuracy', cv = cv, n_jobs = -1)
print("Accuracy: %.4f" % (np.mean(scores)))

print(f"Precision: {round(precision_score(y_test, labels), 4)}")
print(f"Recall: {round(recall_score(y_test, labels), 4)}")
print(f"F1_score: {round(f1_score(y_test, labels), 4)}")


# Exporting
xgb.fit(X, y)
labels = xgb.predict(test_X)
y_pred = pd.DataFrame(testX_df['"ID_Test"'].to_numpy(), columns = ['"ID_Test"'])
y_pred['Label'] = labels
y_pred.to_csv('dataset/y_pred.csv', index = False)



    


