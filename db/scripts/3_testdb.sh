sleep 5

# Prepare variables
TABLECASES=Cases
TABLECOUNTIES=Counties
TABLESTATES=States

SQL_EXISTSCASES="\dt \"$TABLECASES\""
SQL_EXISTSSTATES="\dt \"$TABLESTATES\""
SQL_EXISTSCOUNTIES="\dt \"$TABLECOUNTIES\""

# Credentials
USERNAME=virometer    
PASSWORD=virometerPasswort1
DATABASE=virometer

export POSTGRES_PASSWORD=$PASSWORD
echo "Set POSTGRES_PASSWORD to $POSTGRES_PASSWORD"

echo "Checking if table <$TABLECASES> exists ..."

# Check if table exists
if [[ $(psql -U $USERNAME -d $DATABASE -c "$SQL_EXISTSCASES") ]]
then
    echo "Table '$TABLECASES' exists ..."


else
    echo "Table '$TABLECASES' not exists ..."
    exit 1
fi

echo "Checking if table <$TABLECOUNTIES> exists ..."

# Check if table exists
if [[ $(psql -U $USERNAME -d $DATABASE -c "$SQL_EXISTSCOUNTIES") ]]
then
    echo "Table '$TABLECOUNTIES' exists ..."


else
    echo "Table '$TABLECOUNTIES' not exists ..."
    exit 1
fi

echo "Checking if table <$TABLESTATES> exists ..."

# Check if table exists
if [[ $(psql -U $USERNAME -d $DATABASE -c "$SQL_EXISTSSTATES") ]]
then
    echo "Table '$TABLESTATES' exists ..."


else
    echo "Table '$TABLESTATES' not exists ..."
    exit 1
fi