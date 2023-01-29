from typing import Reversible
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

# read review
df = pd.read_csv('../data_src/meta_Movies_and_TV.csv')
df.head()

# read meta
df_movies = pd.read_csv('../data_src/Movies_and_TV.csv')
df_join = pd.merge(df_movies, df, how='inner', on='asin')
df_join.head()

n_dims = 10 #how do I set this parameter?

def get_ratings_matrix(df, train_size=0.75):
    user_to_row = {}
    movie_to_column = {}
    df_values = df.values
    parameters = {}
    
    uniq_users = np.unique(df['reviewerID']) #beware here, may need to use df_value instead
    uniq_movies = np.unique(df['asin']) #beware here, may need to use df_value instead
    
    # mapping raw reviewerID and asin to new id in rating matrix
    for i, user_id in enumerate(uniq_users):
        user_to_row[user_id] = i

    for j, movie_id in enumerate(uniq_movies):
        movie_to_column[movie_id] = j
    
    n_users = len(uniq_users)
    n_movies = len(uniq_movies)
    
    R = np.zeros((n_users, n_movies))
    
    df_copy = df.copy()
    train_set = df_copy.sample(frac=train_size, random_state=0)
    test_set = df_copy.drop(train_set.index)
    
    # need to change this part for a smaller matrix
    for index, row in train_set.iterrows():
        i = user_to_row[row.reviewerID]
        j = movie_to_column[row.asin]
        R[i, j] = row.overall

    return R, train_set, test_set, n_users, n_movies, user_to_row, movie_to_column

R, train_set, test_set, n_users, n_movies, user_to_row, movie_to_column = get_ratings_matrix(df_join, 0.8)
print(R)

parameters = {}

def initialize_parameters(lambda_U, lambda_V):
    U = np.zeros((n_dims, n_users), dtype=np.float64)
    V = np.random.normal(0.0, 1.0 / lambda_V, (n_dims, n_movies))
    
    parameters['U'] = U
    parameters['V'] = V
    parameters['lambda_U'] = lambda_U
    parameters['lambda_V'] = lambda_V


def update_parameters():
    U = parameters['U']
    V = parameters['V']
    lambda_U = parameters['lambda_U']
    lambda_V = parameters['lambda_V']
    
    for i in range(n_users):
        V_j = V[:, R[i, :] > 0]
        U[:, i] = np.dot(np.linalg.inv(np.dot(V_j, V_j.T) + lambda_U * np.identity(n_dims)), np.dot(R[i, R[i, :] > 0], V_j.T))
        
    for j in range(n_movies):
        U_i = U[:, R[:, j] > 0]
        V[:, j] = np.dot(np.linalg.inv(np.dot(U_i, U_i.T) + lambda_V * np.identity(n_dims)), np.dot(R[R[:, j] > 0, j], U_i.T))
        
    parameters['U'] = U
    parameters['V'] = V

def log_a_posteriori():
    lambda_U = parameters['lambda_U']
    lambda_V = parameters['lambda_V']
    U = parameters['U']
    V = parameters['V']
    
    UV = np.dot(U.T, V)
    R_UV = (R[R > 0] - UV[R > 0])
    
    return -0.5 * (np.sum(np.dot(R_UV, R_UV.T)) + lambda_U * np.trace(np.dot(U, U.T)) + lambda_V * np.trace(np.dot(V, V.T)))

def predict(user_id, movie_id):
    U = parameters['U']
    V = parameters['V']
    
    r_ij = U[:, user_to_row[user_id]].T.reshape(1, -1) @ V[:, movie_to_column[movie_id]].reshape(-1, 1)

    max_rating = parameters['max_rating']
    min_rating = parameters['min_rating']

    return 0 if max_rating == min_rating else ((r_ij[0][0] - min_rating) / (max_rating - min_rating)) * 5.0

def evaluate(dataset):
    ground_truths = []
    predictions = []
    
    for index, row in dataset.iterrows():
        ground_truths.append(row.loc['overall'])
        predictions.append(predict(row.loc['reviewerID'], row.loc['asin']))
    
    return mean_squared_error(ground_truths, predictions, squared=False)

def update_max_min_ratings():
    U = parameters['U']
    V = parameters['V']

    R = U.T @ V
    min_rating = np.min(R)
    max_rating = np.max(R)

    parameters['min_rating'] = min_rating
    parameters['max_rating'] = max_rating

def train(n_epochs):
    initialize_parameters(0.3, 0.3)
    log_aps = []
    rmse_train = []
    rmse_test = []

    update_max_min_ratings()
    rmse_train.append(evaluate(train_set))
    rmse_test.append(evaluate(test_set))
    
    for k in range(n_epochs):
        update_parameters()
        log_ap = log_a_posteriori()
        log_aps.append(log_ap)

        if (k + 1) % 10 == 0:
            update_max_min_ratings()

            rmse_train.append(evaluate(train_set))
            rmse_test.append(evaluate(test_set))
            print('Log p a-posteriori at iteration', k + 1, ':', log_ap)

    update_max_min_ratings()

    return log_aps, rmse_train, rmse_test

log_ps, rmse_train, rmse_test = train(150)

_, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10))
plt.title('Training results')
ax1.plot(np.arange(len(log_ps)), log_ps, label='MAP')
ax1.legend()

ax2.plot(np.arange(len(rmse_train)), rmse_train, label='RMSE train')
ax2.plot(np.arange(len(rmse_test)), rmse_test, label='RMSE test')
ax2.legend()

plt.show()

print('RMSE of training set:', evaluate(train_set))
print('RMSE of testing set:', evaluate(test_set))

user_id = "A3478QRKQDOPQ2"
df_join[df_join['reviewerID'] == user_id].sort_values(by=['overall'], ascending=False).head(10)
df_join[df_join['reviewerID'] == user_id].sort_values(by=['overall']).head(10)

# look up most likely preferences
predictions = np.zeros((n_movies, 1))
movie_to_column_items = np.array(list(movie_to_column.items()))
df_result = pd.DataFrame(columns=['reviewerID','asin','title','prediction'])

for i, movie in enumerate(movie_to_column_items):
    predictions[i] = predict(user_id, movie[0])
    
indices = np.argsort(-predictions, axis=0)

for j in range(10):
    movie_id = movie_to_column_items[np.where(movie_to_column_items[:, 1] == str(indices[j][0]))][0][0]
    df_row = pd.DataFrame({
        'reviewerID': user_id,
        'asin': movie_id,
        'title': df_join[df_join['asin'] == movie_id].iloc[0]['title'],
        'prediction': predictions[indices[j]][0][0]
    }, index=[j])
    df_result = df_result.append(df_row, sort=False)
    
df_result

# look up least likely preferences
df_result = pd.DataFrame(columns=['reviewerID','asin','title','prediction'])
indices = np.argsort(predictions, axis=0)

for j in range(10):
    movie_id = movie_to_column_items[np.where(movie_to_column_items[:, 1] == str(indices[j][0]))][0][0]
    df_row = pd.DataFrame({
        'reviewerID': user_id,
        'asin': movie_id,
        'title': df_join[df_join['asin'] == movie_id].iloc[0]['title'],
        'prediction': predictions[indices[j]][0][0]
    }, index=[j])
    df_result = df_result.append(df_row, sort=False)
    
df_result
