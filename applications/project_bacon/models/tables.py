from datetime import datetime

db.define_table('wordList',
                Field('word')
                )

db.define_table('games',
                Field('targetWord'),
                Field('highScore', 'integer'),
                Field('winner', db.auth_user),
                Field('wordPath'),
                Field("createdBy", db.auth_user, default = auth.user_id),
                Field("creatorName"),
                Field("createdOn", 'datetime', default = datetime.utcnow()),
                Field("lastPlayed", 'datetime', default = datetime.utcnow())
                )

db.games.createdBy.readable = db.games.createdBy.writable = False
db.games.createdOn.readable = db.games.createdOn.writable = False
db.games.creatorName.readable = db.games.creatorName.writable = False
db.games.lastPlayed.readable = db.games.lastPlayed.writable = False
db.games.highScore.readable = db.games.highScore.writable = False
db.games.winner.readable = db.games.winner.writable = False
db.games.wordPath.readable = db.games.wordPath.writable = False
db.games.id.readable = db.games.id.writable = False

db.define_table('game_names',
                Field('word')
                )

db.define_table('leaderboard',
                Field('highScore', 'integer'),
                Field('gameId'),
                Field('winner', db.auth_user),
                Field("gameDate", 'datetime', default = datetime.utcnow()),
                )

db.leaderboard.highScore.readable = db.leaderboard.highScore.writable = False
db.leaderboard.gameId.readable = db.leaderboard.gameId.writable = False
db.leaderboard.winner.readable = db.leaderboard.winner.writable = False
db.leaderboard.gameDate.readable = db.leaderboard.gameDate.writable = False
db.leaderboard.id.readable = db.leaderboard.id.writable = False

db.define_table('players',
                Field("userId", db.auth_user, default = auth.user_id),
                Field('score', 'integer'),
                Field("joined", 'datetime', default = datetime.utcnow()),
                )

db.players.userId.readable = db.players.userId.userId = False
db.players.score.readable = db.players.score.writable = False
db.players.joined.readable = db.players.joined.writable = False
db.players.id.readable = db.players.id.writable = False
