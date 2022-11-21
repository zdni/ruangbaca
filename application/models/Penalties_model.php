<?php

class Penalties_model extends CI_Model {
    private $_table = 'penalties';

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

    public function penalty( $id = NULL, $transaction_id = NULL )
    {
        if( $id ) $this->db->where( $this->_table . '.id', $id );
        if( $transaction_id ) $this->db->where( $this->_table . '.transaction_id', $transaction_id );
        
        return $this->penalties();
    }

    public function penalties( $status = NULL )
    {
        $this->db->select( $this->_table . '.*' );
        if( is_numeric($status) ) $this->db->where( $this->_table . '.status', $status );
        
        return $this->db->get( $this->_table );
    }
}

?>