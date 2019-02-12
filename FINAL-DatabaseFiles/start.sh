#!/bin/bash

printf "\nCreating Tables\n"
php createTables.php

printf "\n\nScraping\n"
php grabPage.php

printf "Processing the data...\n"
php processData.php

printf "Inserting data.  This is going to take a while\n"
php insertData.php

printf "Done!\n"


