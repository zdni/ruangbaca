<?php

// 0: pengajuan,
// 1: peminjaman,
// 2: dikembalikan,
// 3: terlambat,
// 4: terlambat dikembalikan,
// 5: sanksi sudah dibayar
// 6: dibatalkan

class Transactions_model extends CI_Model {
    private $_table = 'transactions';

    public function create( $data = NULL )
    {
        if ( $data ) {
            $this->db->insert( $this->_table, $data);
            $insert_id = $this->db->insert_id();
            return $insert_id;
        }
        return false;
    }

    public function update( $id = NULL, $data = NULL )
    {
        if ( $id && $data ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->update( $this->_table, $data );
        }
        return false;
    }

    public function delete( $id = NULL )
    {
        if ( $id ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->delete( $this->_table );
        }
        return false;
    }

    public function transaction( $id = NULL )
    {
        if( $id ) $this->db->where('id', $id);

        return $this->transactions();
    }

    public function transactions( $user_id = NULL, $document_id = NULL, $status = NULL )
    {
        $this->db->select( $this->_table . '.*' );
        $this->db->select( 'documents.title AS document_title' );
        $this->db->select( 'users.name AS user_name' );
        $this->db->join(
            'documents',
            'documents.id = transactions.document_id',
            'join',
        );
        $this->db->join(
            'users',
            'users.id = transactions.user_id',
            'join',
        );
        
        if( $user_id ) $this->db->where( $this->_table . '.user_id', $user_id );
        if( $document_id ) $this->db->where( $this->_table . '.document_id', $document_id );
        if( is_array( $status ) ) $this->db->where_in( $this->_table . '.status', $status );

        $this->db->order_by( $this->_table . '.id DESC' );
        return $this->db->get( $this->_table );
    }
}

?>