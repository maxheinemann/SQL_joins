//TODO Ziel: Ich mache die Tabellenreihenfolge random, so muss wirklich auch auf die Tabellenbezeichnung geachtet werden

class Helper {

    alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    names_used = [];

    get_name_not_used_yet(){
        var name;
        for(i=0;i<60;i++){
            var ran = document.new_random_integer(26);
            if(!this.names_used.includes(this.alphabet[ran])){
                this.names_used.push(this.alphabet[ran]);
                name = this.alphabet[ran];
                i = i + 60;
            }
        }
        return name;
    }

    generate_table(table_name, att_add, att_cur_1, att_cur_2, att_add_pos){
        var tab = '';
        switch (att_add_pos) {
            case 0:
                tab += table_name + '(' + att_add + ',' + att_cur_1 + ',' + att_cur_2 + ')';
                break;
            case 1:
                tab += table_name + '(' + att_cur_1 + ',' + att_add + ',' + att_cur_2 + ')';
                break;
            case 2:
                tab += table_name + '(' + att_cur_1 + ',' + att_cur_2 + ',' + att_add + ')';
                break;
        }
        return tab;
    }

    generate_select(first_att, sec_att, third_att, select_dec_pos){
        var tab = '';
        switch (select_dec_pos) {
            case 0:
                tab += 'SELECT ' + first_att + ',' + third_att + ',' + sec_att;
                break;
            case 1:
                tab += 'SELECT ' + sec_att + ',' + first_att + ',' + third_att;
                break;
            case 2:
                tab += 'SELECT ' + third_att + ',' + sec_att + ',' + first_att;
                break;
        }
        return tab;
    }

    generate_order(number_tables){
        var order_return = [];
        for(i=0;i<number_tables;i++){
            for(i2=0;i2<30;i2++){
                var val = document.new_random_integer(4);
                if(!order_return.includes(val)){
                    order_return.push(val);
                    i2 = i2 + 30;
                }
            }
        }
        return order_return;
    }
}

class stringBuilderClass {
    create_stmt (join_type, pos_error){
        var stmt = '';
        var order_dec_1 = document.new_random_integer(2);
        var order_dec_2 = document.new_random_integer(2);
        var order_in_condition_1;
        var order_in_condition_2;
        var pos_error_alt;
        if(order_dec_1 === 0){
            order_in_condition_1 = 'inorder';
            switch (pos_error){
                case '1': pos_error_alt = '1';break;
                case '2': pos_error_alt = '2';break;
                case '3': pos_error_alt = '3';break;
                case '4': pos_error_alt = '4';break;
                case '5': pos_error_alt = '5';break;
            }
        }
        if(order_dec_1 === 1){
            order_in_condition_1 = 'reversed';
            switch (pos_error){
                case '1': pos_error_alt = '2';break;
                case '2': pos_error_alt = '1';break;
                case '5': pos_error_alt = '5';break;
            }
        }
        if(order_dec_2 === 0){
            order_in_condition_2 = 'inorder';
            switch (pos_error){
                case '3': pos_error_alt = '3';break;
                case '4': pos_error_alt = '4';break;
            }
        }
        if(order_dec_2 === 1){
            order_in_condition_2 = 'reversed';
            switch (pos_error){
                case '3': pos_error_alt = '4';break;
                case '4': pos_error_alt = '3';break;
                case '5': pos_error_alt = '5';break;
            }
        }
        var order = [];
        order = helper.generate_order(4);
        //stmt += pos_error + ' und ' + order  +'\n';
        //stmt += 'order1: ' + order_in_condition_1 + ' und order2: ' + order_in_condition_2 + '\n';
        var indended = 'yes';
        var order_sub = document.new_random_integer(2);
        if(order_dec_1 === 1 || order_dec_2 === 1){
            stmt += this.built_statement(join_type, pos_error_alt, order_in_condition_1, order, indended, order_sub, order_in_condition_2);
        }else{
            stmt += this.built_statement(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2);
        }
        helper.names_used = [];
        return stmt;
    }

    built_statement(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2){
        var task = '';
        switch (join_type) {
            case 'join_on_even': task += this.built_join_on_even(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2);break;
            case 'join_using' : task += this.built_join_using(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2);break;
        }
        return task;
    }
//TODO warum kommt hier noch nichts
    built_join_on_even(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2){

        var att_name_1 = helper.get_name_not_used_yet();
        var att_name_sub = helper.get_name_not_used_yet();

        var table_name_1 = helper.get_name_not_used_yet();
        var table_name_2 = helper.get_name_not_used_yet();
        var table_name_sub = helper.get_name_not_used_yet();
        var table_name_four = helper.get_name_not_used_yet();

        var att_name_additionally_1 = helper.get_name_not_used_yet();
        var att_name_additionally_2 = helper.get_name_not_used_yet();
        var att_name_additionally_sub = helper.get_name_not_used_yet();
        var att_name_additionally_1_pos = document.new_random_integer(3);
        var att_name_additionally_2_pos = document.new_random_integer(3);
        var att_name_additionally_sub_pos = document.new_random_integer(3);
        var att_name_additionally_four_pos = document.new_random_integer(3);
        var select_dec_pos = document.new_random_integer(3);

        var att_name_wrong = helper.get_name_not_used_yet();

        var tab1;
        var tab2;
        var tab3;
        var tab4;
        switch (pos_error){
            case '1':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '2':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '3':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '4':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '5':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
        }

        var stmt = 'SELECT *                       ';
        stmt += tab1;

        stmt += '\n';
        if(order_sub === 0){
            stmt += 'FROM ' + table_name_2 + ' JOIN                    ';
        }else{
            stmt += 'FROM                           ';
        }
        stmt += tab2 + '\n';
        if(indended === 'yes'){
            stmt += '     (';
        }
        if(indended === 'yes'){
            stmt += '                         ';
        }else{
            stmt += '                             ';
        }
        stmt += tab3 + '\n';
        if(indended === 'yes'){
            stmt += '       ';
        }
        if(pos_error === '1'){
            stmt += helper.generate_select(att_name_1, att_name_additionally_1, att_name_sub, select_dec_pos);
        }
        if(pos_error === '2'){
            stmt += helper.generate_select(att_name_sub, att_name_additionally_sub, att_name_1, select_dec_pos);
        }
        if (pos_error !== '1' && pos_error !== '2'){
            stmt += helper.generate_select(att_name_1, att_name_additionally_sub, att_name_sub, select_dec_pos);
        }
        stmt += '            ' + tab4;
        if(indended === 'yes'){
            stmt += '\n       ';
        }
        stmt += 'FROM ' + table_name_1 + ' JOIN ' + table_name_sub + '\n';
        if(indended === 'yes'){
            stmt += '       ';
        }
        if(order_in_condition_1 === 'inorder'){
            stmt += 'ON('
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub;
            stmt += ')\n';

        }
        if(order_in_condition_1 === 'reversed'){
            stmt += 'USING('
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1;
            stmt += ')\n';

        }

        if(indended === 'yes'){
            stmt += '     ';
        }

        stmt += ')q1\n';
        if(order_sub === 1){
            stmt += 'JOIN ' + table_name_2 + '\n';
        }
        stmt += 'ON(';
        if (pos_error !== '3' && pos_error !== '4') {

            if(pos_error === '1'){
                if (order_in_condition_2 === 'inorder') {
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ')  ';
                }
            }else{
                if (order_in_condition_2 === 'inorder') {
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ')  ';
                }
            }


        }
        if(pos_error === '3' || pos_error === '4'){
            var projection_dec = document.new_random_integer(2);
            if(projection_dec === 0){ //fehler in dritter tabelle

                if (order_in_condition_2 === 'reversed' && pos_error === '4') {
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ')  ';
                }else{
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ')';
                }
            }
            if(projection_dec === 1){ //fehler in projection

                if (order_in_condition_2 === 'inorder') {
                    stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_sub + ' = ' + table_name_2 + '.' + att_name_additionally_sub;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                    stmt += ')  ';
                }
            }
        }
        return stmt;
    }

    built_join_using(join_type, pos_error, order_in_condition_1, order, indended, order_sub, order_in_condition_2){

        var att_name_1 = helper.get_name_not_used_yet();
        var att_name_sub = helper.get_name_not_used_yet();

        var table_name_1 = helper.get_name_not_used_yet();
        var table_name_2 = helper.get_name_not_used_yet();
        var table_name_sub = helper.get_name_not_used_yet();
        var table_name_four = helper.get_name_not_used_yet();

        var att_name_additionally_1 = helper.get_name_not_used_yet();
        var att_name_additionally_2 = helper.get_name_not_used_yet();
        var att_name_additionally_sub = helper.get_name_not_used_yet();
        var att_name_additionally_1_pos = document.new_random_integer(3);
        var att_name_additionally_2_pos = document.new_random_integer(3);
        var att_name_additionally_sub_pos = document.new_random_integer(3);
        var att_name_additionally_four_pos = document.new_random_integer(3);
        var select_dec_pos = document.new_random_integer(3);

        var att_name_wrong = helper.get_name_not_used_yet();

        var tab1;
        var tab2;
        var tab3;
        var tab4;
        switch (pos_error){
            case '1':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_wrong, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_1, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '2':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_wrong, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '3':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '4':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_wrong, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_sub, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
            case '5':
                for(i=0;i<order.length;i++){
                    switch (i){
                        case 0:
                            switch (order[i]){
                                case 0: tab1 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab1 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab1 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab1 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 1:
                            switch (order[i]){
                                case 0: tab2 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab2 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab2 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab2 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 2:
                            switch (order[i]){
                                case 0: tab3 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab3 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab3 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab3 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                        case 3:
                            switch (order[i]){
                                case 0: tab4 = helper.generate_table(table_name_1, att_name_additionally_1, att_name_1, att_name_sub, att_name_additionally_1_pos);break;
                                case 1: tab4 = helper.generate_table(table_name_sub, att_name_additionally_sub, att_name_1, att_name_sub, att_name_additionally_sub_pos);break;
                                case 2: tab4 = helper.generate_table(table_name_2, att_name_additionally_2, att_name_additionally_sub, att_name_1, att_name_additionally_2_pos);break;
                                case 3: tab4 = helper.generate_table(table_name_four,att_name_sub,att_name_additionally_2,att_name_1,att_name_additionally_four_pos);break;
                            }break;
                    }
                }break;
        }

        var stmt = 'SELECT *                       ';
        stmt += tab1;

        stmt += '\n';
        if(order_sub === 0){
            stmt += 'FROM ' + table_name_2 + ' JOIN                    ';
        }else{
            stmt += 'FROM                           ';
        }
        stmt += tab2 + '\n';
        if(indended === 'yes'){
            stmt += '     (';
        }
        if(indended === 'yes'){
            stmt += '                         ';
        }else{
            stmt += '                             ';
        }
        stmt += tab3 + '\n';
        if(indended === 'yes'){
            stmt += '       ';
        }
        if(pos_error === '1'){
            stmt += helper.generate_select(att_name_1, att_name_additionally_1, att_name_sub, select_dec_pos);
        }
        if(pos_error === '2'){
            stmt += helper.generate_select(att_name_sub, att_name_additionally_sub, att_name_1, select_dec_pos);
        }
        if (pos_error !== '1' && pos_error !== '2'){
            stmt += helper.generate_select(att_name_1, att_name_additionally_sub, att_name_sub, select_dec_pos);
        }
        stmt += '            ' + tab4;
        if(indended === 'yes'){
            stmt += '\n       ';
        }
        stmt += 'FROM ' + table_name_1 + ' JOIN ' + table_name_sub + '\n';
        if(indended === 'yes'){
            stmt += '       ';
        }
        if(order_in_condition_1 === 'inorder'){
            stmt += 'USING('
            stmt += att_name_1;
            stmt += ',';
            stmt += att_name_sub;
            stmt += ')\n';
        }
        if(order_in_condition_1 === 'reversed'){
            stmt += 'USING('
            stmt += att_name_sub;
            stmt += ',';
            stmt += att_name_1;
            stmt += ')\n';
        }

        if(indended === 'yes'){
            stmt += '     ';
        }

        stmt += ')q1\n';
        if(order_sub === 1){
            stmt += 'JOIN ' + table_name_2 + '\n';
        }

        if (pos_error !== '3' && pos_error !== '4') {
            stmt += 'USING(';
            if(pos_error === '1'){
                if (order_in_condition_2 === 'inorder') {
                    stmt += att_name_1;
                    stmt += ',';
                    stmt += att_name_additionally_1;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += att_name_additionally_1;
                    stmt += ',';
                    stmt += att_name_1;
                    stmt += ')  ';
                }
            }else{
                if (order_in_condition_2 === 'inorder') {
                    stmt += att_name_1;
                    stmt += ',';
                    stmt += att_name_additionally_sub;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += att_name_additionally_sub;
                    stmt += ',';
                    stmt += att_name_1;
                    stmt += ')  ';
                }
            }
        }
        if(pos_error === '3' || pos_error === '4'){
            var projection_dec = document.new_random_integer(2);
            stmt += 'USING(';
            if(projection_dec === 0){ //fehler in dritter tabelle

                if (order_in_condition_2 === 'reversed' && pos_error === '4') {
                    stmt += att_name_additionally_sub;
                    stmt += ',';
                    stmt += att_name_1;
                    stmt += ')  ';
                }else{
                    stmt += att_name_1;
                    stmt += ',';
                    stmt += att_name_additionally_sub;
                    stmt += ')';
                }
            }
            if(projection_dec === 1){ //fehler in projection
                if (order_in_condition_2 === 'inorder') {
                    stmt += att_name_additionally_2;
                    stmt += ',';
                    stmt += att_name_additionally_sub;
                    stmt += ')  ';
                }
                if (order_in_condition_2 === 'reversed') {
                    stmt += att_name_additionally_sub;
                    stmt += ',';
                    stmt += att_name_additionally_2;
                    stmt += ')  ';
                }
            }
        }
        return stmt;
    }
}

const helper = new Helper();
const stringBuilder = new stringBuilderClass();
var i;
var i2;
var i3;

document.experiment_definition(
    {
        experiment_name:'Main Experiment',
        seed:'42',
        introduction_pages:['First off all, thank you for participating in this experiment. It will take you approximately 35min.\n' +
        'The experiment investigates the readability of SQL Joins.\n' +

        'You will see SQL queries with two different variants of join conditions, JOIN ON and JOIN USING.\n' +
        'Each query joins three of the four shown tables on the right through their attribute names. \n' +
        'Your task is to identify the condition which has an error in it as fast as possible.\n' +
        'Please check out the how_to_solve_the_tasks.pdf in the repository before you continue!\n\n',

        'Before we start, first adjust the font in the first training exercise, so that you can see all lines of code while maintaining easily readable font.\n'+
        'Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] ' +
        'or [CTRL] + [-]. Also, you can use [F11] to go full screen',

        ],
        pre_run_instruction:'Please put your fingers on 1,2,3.\n' +
        'Note: After you typed a response, you can take a break if you need to. The timer starts after pressing [ENTER].\n' +
        'When you press [Enter] the first task will be shown.',
        finish_pages:['Thanks for participating. When you press [Enter], the experiments data will be downloaded.\n\n' +
        'If you want to contribute to research, you can send the downloaded file to maximilian.heinemann@stud.uni-due.de.'],
        layout:[
            //Welche Variablen braucht mein Versuchs
            {variable:'Join_Type',treatments:['join_on_even', 'join_using']}, //, 'join_on_even', 'join_using'
            {variable:'pos_error',treatments:['1', '2', '3', '4', '5']},//'1', '2', '3', '4', '5'
        ],
        repetitions:10,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:['1', '2', '3'], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{



            let join_type = t.treatment_combination[0].value;
            let pos_error = t.treatment_combination[1].value;


            let task = '';

            task += stringBuilder.create_stmt(join_type, pos_error);

            console.log(t.treatment_combination);

            if(t.treatment_combination[0].value==='join_on_even'){
                t.code = task;
                if(pos_error === '1' || pos_error === '2'){
                    t.expected_answer = '1';
                }
                if(pos_error === '3' || pos_error === '4'){
                    t.expected_answer = '2';
                }
                if(pos_error === '5'){
                    t.expected_answer = '3';
                }
            }

            if(t.treatment_combination[0].value==='join_using'){
                t.code = task;
                if(pos_error === '1' || pos_error === '2'){
                    t.expected_answer = '1';
                }
                if(pos_error === '3' || pos_error === '4'){
                    t.expected_answer = '2';
                }
                if(pos_error === '5'){
                    t.expected_answer = '3';
                }
            }

            t.after_task_string = ()=>'The correct answer for the code was: ' + t.expected_answer;

        }
    }
);



3
