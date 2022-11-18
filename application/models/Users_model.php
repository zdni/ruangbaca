<?php

class Users_model extends CI_Model {
    private $_table = 'users';

    public function create( $data = NULL )
    {
        if ($data) {
            $this->db->insert( $this->_table, $data);
            $insert_id = $this->db->insert_id();
            return $insert_id;
        }
        return false;
    }

    public function update( $user_id = NULL, $data = NULL )
    {
        if ($user_id && $data) {
            $this->db->where( $this->_table . '.id', $user_id );
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

    public function user( $user_id = NULL, $username = NULL )
    {
        if ($user_id) {
            $this->db->where( $this->_table . '.id', $user_id );
        }
        if ($username) {
            $this->db->where( $this->_table . '.username', $username );
        }
        $this->db->limit(1);
        return $this->users();
    }

    public function users_laboratory( $sector_id = NULL )
    {
        if ($sector_id) $this->db->where( $this->_table . '.sector_id', $sector_id );
        return $this->users();
    }

    public function users(  )
    {
        $this->db->select( $this->_table . '.*' );
        $this->db->select( 'roles.name AS role_name' );
        $this->db->join(
            'roles', 
            'roles.id = users.role_id',
            'join'
        );
        return $this->db->get( $this->_table );
    }
}

?>